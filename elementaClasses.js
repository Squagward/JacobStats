import * as Elementa from "../Elementa/index";
import { charToString, resetData } from "./utils";
import { theColor } from "./constants";

const Color = Java.type("java.awt.Color");

export class Homepage {
  constructor() {
    this.gui = new Gui();
    this.text = "";

    this.title = new Elementa.UIText("Username:")
      .setX(new Elementa.CenterConstraint())
      .setY((5).pixels());

    this.nameText = new Elementa.UIText(this.text)
      .setX(new Elementa.CenterConstraint())
      .setY(new Elementa.AdditiveConstraint(
        new Elementa.SiblingConstraint(),
        (5).pixels()
      ));

    this.background = new Elementa.UIBlock(theColor)
      .setX((new Elementa.CenterConstraint()))
      .setY(new Elementa.CenterConstraint())

      .setWidth(new Elementa.AdditiveConstraint(
        new Elementa.ChildBasedMaxSizeConstraint(),
        (10).pixels()
      ))
      .setHeight(new Elementa.AdditiveConstraint(
        new Elementa.ChildBasedSizeConstraint(5),
        (10).pixels()
      ))

      .addChildren(this.title, this.nameText);
  }

  setText(text) {
    this.text = text;
    this.nameText
      .setText(this.text)
      .setX(new Elementa.CenterConstraint());
  }

  close() {
    this.setText("");
    this.gui.close();
    resetData();
  }

  addLetter(char, keyCode) {
    if (charToString(char).match(/\w/) && this.text.length < 16)
      this.text += charToString(char);

    if (keyCode === 14) // BACKSPACE
      this.text = this.text.substring(0, this.text.length - 1);

    this.nameText
      .setText(this.text)
      .setX(new Elementa.CenterConstraint());
    this.background
      .setX(new Elementa.CenterConstraint())
      .setWidth(new Elementa.AdditiveConstraint(
        new Elementa.ChildBasedMaxSizeConstraint(),
        (10).pixels()
      ));
  }

  open() {
    this.setText("");
    this.gui.open();
  }
}

export class Tab extends Homepage {
  constructor() {
    super();

    this.shownGroup = [
      this.title,
      this.nameText
    ];
  }

  open() {
    super.open();
    this.resetGroup();

    this.background
      .clearChildren()
      .addChildren(...this.shownGroup);

    this.updateTabSize();
  }

  resetGroup() {
    this.shownGroup = [
      this.title,
      this.nameText
    ];
  }

  setTitle(text) {
    this.title
      .setText(text);
  }

  setHeader(title, subtitle) {
    this.title.setText(title);
    this.nameText.setText(subtitle);
  }

  setLines(title, sub, ...lines) {
    this.resetGroup();
    this.setHeader(title, sub);
    for (let i = 0; i < lines.length; i++) {
      this.shownGroup.push(new Elementa.UIText(lines[i]));
    }
  }

  updateTabSize() {
    this.shownGroup.forEach((comp, index) => {
      if (index === 0) {
        comp
          .setX(new Elementa.CenterConstraint())
          .setY((5).pixels());
      }
      else {
        comp
          .setX(new Elementa.CenterConstraint)
          .setY(new Elementa.SiblingConstraint(5));
      }
    });

    this.background
      .setX(new Elementa.CenterConstraint())
      .setY(new Elementa.CenterConstraint())

      .clearChildren()
      .addChildren(...this.shownGroup)

      .setWidth(new Elementa.AdditiveConstraint(
        new Elementa.ChildBasedMaxSizeConstraint(),
        (10).pixels()
      ))
      .setHeight(new Elementa.AdditiveConstraint(
        new Elementa.ChildBasedSizeConstraint(5),
        (10).pixels()
      ));
  }
}

export class InfoBox extends Tab {
  constructor() {
    super();

    this.background
      .setX((0).pixels())
      .setY((0).pixels())

      .setColor(new Elementa.ConstantColorConstraint(
        new Color(0, 0, 0, .7)
      ));
  }

  updateSize() {
    this.shownGroup.forEach((comp, index) => {
      if (index === 0) {
        comp
          .setX(new Elementa.CenterConstraint())
          .setY((5).pixels());
      }
      else {
        comp
          .setX(new Elementa.CenterConstraint())
          .setY(new Elementa.SiblingConstraint(5));
      }
    });
    this.background
      .setX(Client.getMouseX().pixels())
      .setY(Client.getMouseY().pixels())

      .clearChildren()
      .addChildren(...this.shownGroup)

      .setWidth(new Elementa.AdditiveConstraint(
        new Elementa.ChildBasedMaxSizeConstraint(),
        (10).pixels()
      ))
      .setHeight(new Elementa.AdditiveConstraint(
        new Elementa.ChildBasedSizeConstraint(5),
        (10).pixels()
      ));
  }
}