'use strict';
const fs = require('fs');


function help() {
  
  console.log('node app.js --help \t\t\t\t\t for help')
  console.log('node app.js list \t\t\t\t\t to show the list of tab')
  console.log('node app.js add --title your_title --body tab_body \t to add a tab note')
  console.log('node app.js read --title your_title \t\t\t to read a tab note ')
  console.log('node app.js remove --title your_title \t\t\t to remove a tab note')
}

function list() {
  // node main.js list
    let fd = fs.readFileSync('tab.json').toString()
    let tab = JSON.parse(fd);
    console.log('printing', tab.length, 'notes')

    for (let liste of tab) {
      console.log('- Title:', liste.Title, '\t- Body:', liste.Body)
    }
}

function add() {
  
  let newtab = {}

  let indexTitle = process.argv.findIndex((el) => el === '--title')
  if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
    console.log('Missing required argument: --title')
    return
  }
  else newtab['Title'] = process.argv[indexTitle + 1]

  let indexBody = process.argv.findIndex((el) => el === '--body')
  if (indexBody === -1 || typeof process.argv[indexBody + 1] === 'undefined') {
    console.log('Missing required argument: --body')
    return
  }
  else newtab['Body'] = process.argv[indexBody + 1]

  let tab = JSON.parse(fs.readFileSync('tab.json').toString());

  fs.writeFileSync('tab.json', JSON.stringify(tab.concat([newtab])))
}

function read() {
  let title = ''

  let indexTitle = process.argv.findIndex((el) => el === '--title')
  if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
    console.log('Missing required argument: --title')
    return
  }
  else title = process.argv[indexTitle + 1]

  let tab = JSON.parse(fs.readFileSync('tab.json').toString());
  let liste = tab.find(x => x.Title === title)
  if (liste) console.log('- Title:', liste.Title, '\t- Body:', liste.Body)
  else console.log('not found')
}

function remove() {
  let title = ''

  let indexTitle = process.argv.findIndex((el) => el === '--title')
  if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
    console.log('Missing required argument: --title')
    return
  }
  else title = process.argv[indexTitle + 1]

  let tab = JSON.parse(fs.readFileSync('tab.json').toString());
  let liste = tab.find(x => x.Title === title)
  tab.splice(tab.indexOf(tab.find(x => x.Title === title)), 1);

  fs.writeFileSync('tab.json', JSON.stringify(tab))
  console.log('Tab: - Title:', liste.Title, ', - Body:', liste.Body, 'removed successfully')
}

switch (process.argv[2]) {
  case '--help': help(); break;
  case 'list': list(); break;
  case 'add': add(); break;
  case 'read': read(); break;
  case 'remove': remove(); break;
  default: help(); break;
}

if (process.argv.length < 3) help();