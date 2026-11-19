"use strict";

const EXPENSES_KEY = "agromanage.expenses.v1";
const FIELDS_KEY = "agromanage.fields.v1";
const SESSION_KEY = "agromanage.demo-session.v1";
const EXAMPLE_FIELD = { id: "milho-demo", name: "Plantio de milho", crop: "Milho", city: "" };
const MAX_TOTAL_CENTS = 99_999_999_999;
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const decimal = new Intl.NumberFormat("pt-BR", {
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const screens = {
  login: document.querySelector("#login-screen"),
  fields: document.querySelector("#fields-screen"),
  expenses: document.querySelector("#expenses-screen"),
};
const fieldList = document.querySelector("#fields");
const fieldFeedback = document.querySelector("#field-feedback");
const fieldTitle = document.querySelector("#field-title");
const fieldDialog = document.querySelector("#field-dialog");
const fieldForm = document.querySelector("#field-form");
const fieldName = fieldForm.elements.fieldName;
const addFieldButton = document.querySelector("#add-field");

const form = document.querySelector("#expense-form");
const dialog = document.querySelector("#expense-dialog");
const addButton = document.querySelector("#add-expense");
const saveButton = document.querySelector("#save");
const list = document.querySelector("#expenses");
const feedback = document.querySelector("#feedback");
const warning = document.querySelector("#storage-warning");
const description = form.elements.description;
const amount = form.elements.amount;
const date = form.elements.date;

let storageAvailable = true;
let fields = loadRecords(FIELDS_KEY, [EXAMPLE_FIELD], isValidField);
let activeField = null;
let expenses = [];
const expenseCache = new Map();
let editingId = null;
let focusAfterClose = addButton;

function today() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

function isValidDate(value) {
  if (!/^[1-9]\d{3}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + "T00:00:00Z");
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

// Representar dinheiro em centavos evita erros de soma com casas decimais.
function parseAmount(value) {
  const input = value.trim().replace(/^R\$\s*/i, "");
  const grouped = /^\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?$/.test(input);
  const plain = /^(?:\d+(?:[.,]\d{1,2})?|[.,]\d{1,2})$/.test(input);
  if (!grouped && !plain) return null;

  const normalized = grouped ? input.replaceAll(".", "") : input;
  const [whole, fraction = ""] = normalized.replace(",", ".").split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(cents) && cents > 0 ? cents : null;
}

function totalCents(records) {
  return records.reduce((sum, item) => sum + item.amountCents, 0);
}

function isValidExpense(item) {
  return item && typeof item.id === "string" && item.id.length > 0
    && typeof item.description === "string" && item.description.trim().length > 0
    && item.description.length <= 100 && Number.isSafeInteger(item.amountCents)
    && item.amountCents > 0 && typeof item.date === "string" && isValidDate(item.date);
}

function isValidField(item) {
  return item && typeof item.id === "string" && item.id.length > 0
    && typeof item.name === "string" && item.name.trim().length > 0 && item.name.length <= 80
    && typeof item.crop === "string" && item.crop.length <= 80
    && typeof item.city === "string" && item.city.length <= 80;
}

function loadRecords(key, fallback, isValid, validList = () => true) {
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      const records = JSON.parse(saved);
      if (!Array.isArray(records) || !records.every(isValid)
          || new Set(records.map(item => item.id)).size !== records.length
          || !validList(records)) {
        throw new Error("Formato de dados incompatível.");
      }
      return records;
    }
  } catch {
    storageAvailable = false;
    warning.textContent = "Os registros salvos estão indisponíveis. Nesta sessão, as alterações duram até fechar a página.";
  }
  return fallback;
}

function expensesKey(field) {
  // Mantém os lançamentos do primeiro protótipo na roça de exemplo.
  return field.id === EXAMPLE_FIELD.id ? EXPENSES_KEY : EXPENSES_KEY + "." + field.id;
}

function loadExpenses(field) {
  const sample = field.id === EXAMPLE_FIELD.id
    ? [{ id: "exemplo-transporte", description: "Transporte", amountCents: 2000, date: today() }]
    : [];
  return loadRecords(expensesKey(field), sample, isValidExpense,
    records => totalCents(records) <= MAX_TOTAL_CENTS);
}

function persist(key, records) {
  if (!storageAvailable) return;
  try {
    localStorage.setItem(key, JSON.stringify(records));
  } catch {
    storageAvailable = false;
    warning.textContent = "O navegador não conseguiu salvar os registros. As alterações duram até fechar a página.";
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function expenseRow(item) {
  const row = element("li", "expense");
  const details = document.createElement("div");
  const formattedDate = item.date.split("-").reverse().join("/");
  const time = element("time", "expense-date", formattedDate);
  time.dateTime = item.date;
  details.append(element("p", "expense-description", item.description), time);

  const actions = element("div", "expense-actions");
  const edit = element("button", "button button-edit", "Editar");
  edit.type = "button";
  edit.dataset.expenseId = item.id;
  edit.setAttribute("aria-label", "Editar despesa: " + item.description);
  edit.addEventListener("click", () => openForm(item, edit));
  actions.append(element("span", "expense-amount", brl.format(item.amountCents / 100)), edit);
  row.append(details, actions);
  return row;
}

function renderExpenses() {
  document.querySelector("#total").textContent = brl.format(totalCents(expenses) / 100);
  document.querySelector("#count").textContent = expenses.length
    + (expenses.length === 1 ? " despesa registrada" : " despesas registradas");
  document.querySelector("#empty").hidden = expenses.length > 0;
  const ordered = expenses.slice().reverse().sort((a, b) => b.date.localeCompare(a.date));
  list.replaceChildren(...ordered.map(expenseRow));
}

function fieldError(input, message = "") {
  const note = document.querySelector("#" + input.id + "-error");
  note.textContent = message;
  note.hidden = !message;
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
}

function openForm(item, trigger) {
  editingId = item?.id ?? null;
  focusAfterClose = trigger;
  feedback.textContent = "";
  form.reset();
  for (const input of [description, amount, date]) fieldError(input);

  document.querySelector("#dialog-title").textContent = item ? "Editar despesa" : "Adicionar despesa";
  saveButton.textContent = item ? "Salvar alteração" : "Salvar despesa";
  description.value = item?.description ?? "";
  amount.value = item ? decimal.format(item.amountCents / 100) : "";
  date.value = item?.date ?? today();
  dialog.showModal();
}

addButton.addEventListener("click", () => openForm(null, addButton));
document.querySelector("#cancel").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  (focusAfterClose.isConnected ? focusAfterClose : addButton).focus();
});

for (const input of [description, amount, date]) {
  input.addEventListener("input", () => fieldError(input));
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = description.value.trim();
  const cents = parseAmount(amount.value);
  const validDate = isValidDate(date.value);
  fieldError(description, name ? "" : "Informe o que você comprou ou pagou.");
  fieldError(amount, cents === null ? "Informe um valor maior que zero, como 20,50." : "");
  fieldError(date, validDate ? "" : "Informe uma data válida.");

  const invalid = form.querySelector('[aria-invalid="true"]');
  if (invalid) {
    invalid.focus();
    return;
  }

  if (editingId && !expenses.some(item => item.id === editingId)) {
    focusAfterClose = addButton;
    dialog.close();
    feedback.textContent = "Essa despesa não está mais na lista. Confira os registros atuais.";
    return;
  }

  const record = {
    id: editingId ?? makeId(),
    description: name,
    amountCents: cents,
    date: date.value,
  };
  const next = editingId
    ? expenses.map(item => item.id === editingId ? record : item)
    : [...expenses, record];

  if (totalCents(next) > MAX_TOTAL_CENTS) {
    fieldError(amount, "Esse valor faz o total passar do limite de cálculo. Confira o valor.");
    amount.focus();
    return;
  }

  persist(expensesKey(activeField), next);
  expenses = next;
  expenseCache.set(activeField.id, next);
  renderExpenses();

  if (editingId) {
    focusAfterClose = Array.from(list.querySelectorAll(".button-edit"))
      .find(button => button.dataset.expenseId === editingId) ?? addButton;
  }
  dialog.close();
  const action = editingId ? "Despesa atualizada" : "Despesa adicionada";
  feedback.textContent = storageAvailable ? action + "." : action + " nesta sessão.";
});

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? Date.now() + "-" + Math.random();
}

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function changeSession(value) {
  // A sessão é um estado da demonstração, sem autenticação.
  try {
    if (value === null) sessionStorage.removeItem(SESSION_KEY);
    else sessionStorage.setItem(SESSION_KEY, value);
  } catch {
    // O fluxo continua nesta aba quando a sessão não pode ser persistida.
  }
}

function showScreen(name, moveFocus = true) {
  for (const [key, screen] of Object.entries(screens)) screen.hidden = key !== name;
  if (moveFocus) screens[name].querySelector("h1").focus();
}

function renderFields() {
  const rows = fields.map(field => {
    const row = element("li", "field-row");
    const details = element("div", "field-details");
    details.append(element("p", "expense-description", field.name));
    const context = [field.crop, field.city].filter(Boolean).join(" · ");
    if (context) details.append(element("p", "expense-date", context));

    const open = element("button", "button button-edit", "Abrir");
    open.type = "button";
    open.setAttribute("aria-label", "Abrir roça: " + field.name);
    open.addEventListener("click", () => openField(field));
    row.append(details, open);
    return row;
  });
  fieldList.replaceChildren(...rows);
}

function openField(field, moveFocus = true) {
  activeField = field;
  expenses = expenseCache.get(field.id) ?? loadExpenses(field);
  expenseCache.set(field.id, expenses);
  fieldTitle.textContent = field.name;
  feedback.textContent = "";
  changeSession(field.id);
  renderExpenses();
  showScreen("expenses", moveFocus);
}

function showFields(moveFocus = true) {
  activeField = null;
  fieldFeedback.textContent = "";
  changeSession("");
  renderFields();
  showScreen("fields", moveFocus);
}

document.querySelector("#login").addEventListener("click", () => showFields());
document.querySelector("#back-fields").addEventListener("click", () => showFields());
document.querySelector("#logout").addEventListener("click", () => {
  changeSession(null);
  showScreen("login");
});

addFieldButton.addEventListener("click", () => {
  fieldForm.reset();
  fieldError(fieldName);
  fieldDialog.showModal();
});
document.querySelector("#cancel-field").addEventListener("click", () => fieldDialog.close());
fieldDialog.addEventListener("close", () => addFieldButton.focus());
fieldName.addEventListener("input", () => fieldError(fieldName));
fieldForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = fieldName.value.trim();
  if (!name) {
    fieldError(fieldName, "Informe o nome da roça.");
    fieldName.focus();
    return;
  }

  fields = [...fields, {
    id: makeId(),
    name,
    crop: fieldForm.elements.crop.value.trim(),
    city: fieldForm.elements.city.value.trim(),
  }];
  persist(FIELDS_KEY, fields);
  renderFields();
  fieldDialog.close();
  fieldFeedback.textContent = storageAvailable ? "Roça cadastrada." : "Roça cadastrada nesta sessão.";
});

window.addEventListener("storage", event => {
  if (!storageAvailable) return;
  if (event.key === FIELDS_KEY) {
    fields = loadRecords(FIELDS_KEY, [EXAMPLE_FIELD], isValidField);
    renderFields();
  }
  if (!event.key?.startsWith(EXPENSES_KEY)) return;
  const changedField = fields.find(field => expensesKey(field) === event.key);
  if (changedField) expenseCache.delete(changedField.id);
  if (activeField && event.key === expensesKey(activeField)) {
    expenses = loadExpenses(activeField);
    expenseCache.set(activeField.id, expenses);
    renderExpenses();
    feedback.textContent = "Despesas atualizadas a partir de outra aba.";
  }
});

const session = readSession();
const previousField = fields.find(field => field.id === session);
if (previousField) openField(previousField, false);
else if (session !== null) showFields(false);
