import * as cursor from "/common/cursor.js";
import * as pageList from "/common/page-list.js";

pageList.grabPageLists("pages.json",
  document.getElementById("pagelistcontainer"),
  (pages) => cursor.addHoveringToAll(pages));
