// 1.创建虚拟DOM函数
function Element (tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}




// 2.构建真实DOM函数
Element.prototype.render = function () {
  var el = document.createElement(this.tagName) // 根据tagName构建
  var props = this.props

  for (var propName in props) { // 设置节点的DOM属性
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  var children = this.children || []

  children.forEach(function (child) {
    var childEl = (child instanceof Element)
      ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
      : document.createTextNode(child) // 如果字符串，只构建文本节点
    el.appendChild(childEl)
  })

  return el
}


// 使用
var ul = Element('ul', {id: 'list'}, [
  Element('li', {class: 'item'}, ['Item 1']),
  Element('li', {class: 'item'}, ['Item 2']),
  Element('li', {class: 'item'}, ['Item 3'])
])

// 插入真实DOM中
var ulRoot = ul.render()
document.body.appendChild(ulRoot)