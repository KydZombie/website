import { PageList } from "./common/page-list";

new PageList(
  "pages.json", 
  document.getElementById("pagelistcontainer")!, 
  document.getElementById("infopanel")!
);