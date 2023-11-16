// @ts-nocheck
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header"
import Table from "@editorjs/table"

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a Header',
      levels: [1, 2, 3, 4],
      defaultLevel: 2,
      shortcut: 'CMD+SHIFT+H',

    }
  },
  paragraph: Paragraph,
  checklist: CheckList,
  embed: Embed,
  image: Image,
  link: Link,
  list: List,
  quote: Quote,
  simpleImage: SimpleImage,
  delimiter: Delimiter,
  table:Table
};
