const { Menu, Tray, nativeImage, MenuItem } = require('electron').remote
const path = require('path')

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

  unread = path.join(__dirname, 'icon-unread_016.png')
  read = path.join(__dirname, 'icon-read_016.png')

  imgRead = nativeImage.createFromPath(read)
  imgUnread = nativeImage.createFromPath(unread)
  
  let tray = undefined;

  const menuItem1 = new MenuItem({
    label: 'CreateTray', 
    click: () => {
      tray = new Tray(unread)
    }
  })
  const menuItem2 = new MenuItem({
    label: 'DestroyTray', 
    click: () => {
      if (tray) { tray.destroy() }
      tray = undefined
    }
  })

  // Append "Create menu"
  const menu = Menu.getApplicationMenu()
  menu.append(menuItem1)
  menu.append(menuItem2)

  Menu.setApplicationMenu(menu)


  // Automatic generation of menu
  tray = new Tray(imgRead)

  tray.setImage(imgUnread)

  tray.destroy()
  tray = new Tray(imgRead)

  tray.setImage(imgUnread)

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
