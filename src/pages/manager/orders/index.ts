import type { SelectItems } from "~/shared/ui/select/types";
import type { SearchType } from "~/shared/ui/search/type";

import type { StateType } from "~/pages/manager/orders/types";

export const toggleOptions: ({ value: string, icon: string } | { value: string, content: string })[] = [
  { content: "Все", value: "all" },
  { icon: "icon-crown", value: "all" },
  { icon: "icon-thumbs-down", value: "all" },
  { icon: "icon-thumbs-up", value: "all" },
  { icon: "icon-briefcase", value: "all" },
  { icon: "icon-cloud-upload", value: "all" },
  { icon: "icon-truck", value: "all" },
  { icon: "icon-money-bill-alt", value: "all" },
  { icon: "icon-ruble", value: "all" }
];
export const DATE_FORMAT = "YYYYMMDD";
export const yearOptions: SelectItems = [{ value: "2021", title: "2021" }, {
  value: "2022",
  title: "2022"
}, { value: "2023", title: "2023" }];
export const searchTypeOptions: Record<string, SearchType> = {
  "order_number": { title: "Номер заказа", placeholder: "Введите номер заказа" },
  "psid": { title: "Номер фотосессии", placeholder: "Введите номер фотосессии" },
  "client_id": { title: "Клиент ID", placeholder: "Введите id клиента" },
  "phone": { title: "Телефон", placeholder: "Введите телефон" },
  "email": { title: "Email", placeholder: "Введите email" },
  "payer": { title: "Плательщик, ребенок", placeholder: "Введите плательщика" }
};

export const defaultState: StateType = { searchQuery: "", date: [], year: "2022", searchType: "order_number" };