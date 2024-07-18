#! /usr/bin/env node


import inquirer from "inquirer";

import chalk from "chalk";

import chalkAnimation from "chalk-animation";


async function welcome () {
  let title = chalkAnimation.rainbow("\t\t\t\tWelcome to StudentTrack!")
  await new Promise((resolve) => {
      setTimeout(resolve,3000);
  });
  title.stop();
}

await welcome()


const randomNumber : number = Math.floor(10000 + Math.random() * 90000)

let myBalance: number = 0;

let answer = await inquirer.prompt(
    [
        {
          name:"students",
          type:"input",
          message:(chalk.cyan("Enter Student Name:")),
          validate: function (value){
            if (value.trim() !== ""){
                return true;
            }
            return (chalk.red(" Please Enter a Valid Answer."));
          },
        },
        {
          name:"course",
          type:"list",
          message:chalk.rgb(153 , 51 , 102)("Select the Course To Enroll"),
          choices:["MS Office","HTML","JavaScript","TypeScript","Python"]
        }
    ]
);

const tutionFee: {[key: string]: number} = {
  "MS Office" : 2000,
  "HTML" : 2500,
  "JavaScript" : 5000,
  "TypeScript" : 6000,
  "Python": 10000
};
console.log(chalk.green(`\nTution Fees: ${tutionFee[answer.course]}/-\n`));

console.log(chalk.rgb(51,153,102)(`Balance: ${myBalance}\n`));

let paymentType = await inquirer.prompt(
  [
    {
      name:"payment",
      type:"list",
      message:chalk.rgb(153 , 51 , 102)("Select Paymnet Method"),
      choices:["Bank Transfer","EasyPaisa","JazzCash"]
    },
    {
      name:"amount",
      type:"input",
      message:(chalk.rgb(0,128,128))("Transfer Money:"),
      validate: function (value){
            if (value.trim() !== ""){
                return true;
            }
            return chalk.red(" Please Enter a Valid Answer.");
          },
    }
  ]
);
console.log(chalk.rgb(255,153,204)(`\n\nYou Select Payment Method ${paymentType.payment}`));

const tutionFees = tutionFee[answer.course]
const paymentAmount = parseFloat(paymentType.amount)

if(tutionFees === paymentAmount){
  console.log(chalk.green(`\t\t\n\nCongratulations! You have successfully enrolled in ${answer.course}.\t\t`));

  let ans = await inquirer.prompt(
    [
      {
        name:"select",
        type:"list",
        message:chalk.rgb(153 , 51 , 102)("What would you like to do next?"),
        choices:["View Status", "Exit"]
      }
    ]
  )

  if(ans.select === "View Status"){
    console.log(chalk.rgb(0,0,128)("\n\t\tStatus\n\t\t"));
    console.log(chalk.rgb(255,0,255)(`Student Name: ${answer.students}`));
    console.log(chalk.rgb(255,0,255)(`Student ID: ${randomNumber}`));
    console.log(chalk.rgb(255,0,255)(`Course: ${answer.course}`));
    console.log(chalk.rgb(255,0,255)(`Tution Fees Paid: ${paymentAmount}`));
   
  }else{
    console.log(chalk.rgb(255,128,128)("\nExiting Student Management System\n"));
    
  }
}else {
  console.log(chalk.red("Invalid amount due to course\n"));
}