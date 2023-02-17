"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_list_1 = require("./common/page-list");
new page_list_1.PageList("pages.json", document.getElementById("pagelistcontainer"), document.getElementById("infopanel"));
