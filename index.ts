#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let todolist: string[] = [];
let loop = true;

while (loop) {
  const list: {
    TODO: string;
    addmore: boolean;
  } = await inquirer.prompt([
    {
      type: "input",
      name: "TODO",
      message: "What do you want to add in your to-do list",
    },
    {
      type: "confirm",
      name: "addmore",
      message: "Do you want to add more things in your list?",
      default: false,
    },
  ]);

  const { TODO, addmore } = list;
  console.log(list);

  if (TODO) {
    todolist.push(TODO);
    const additionalAction: {
      action: "continue" | "remove" | "exit";
    } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do next?",
        choices: [
          { name: "Continue adding", value: "continue" },
          { name: "Remove an item", value: "remove" },
          { name: "Exit", value: "exit" },
        ],
      },
    ]);

    if (additionalAction.action === "remove") {
      const removeItem: {
        itemToRemove: string;
      } = await inquirer.prompt([
        {
          type: "list",
          name: "itemToRemove",
          message: "Select an item to remove:",
          choices: todolist,
        },
      ]);

      const indexToRemove = todolist.indexOf(removeItem.itemToRemove);
      if (indexToRemove !== -1) {
        todolist.splice(indexToRemove, 1);
        console.log(chalk.yellow("Item removed from the to-do list."));
      } else {
        console.log(chalk.red("Item not found in the to-do list."));
      }
    } else if (additionalAction.action === "exit") {
      loop = false;
    }
  } else {
    console.log(chalk.bgMagentaBright("Enter a valid task."));
  }
}

if (todolist.length > 0) {
  console.log(chalk.bgMagenta("Your TODO_LIST is : \n"));
  todolist.forEach((TODO) => {
    console.log(TODO);
  });
} else {
  console.log("There is no to-do list found.");
}
