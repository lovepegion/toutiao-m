// 本地存储封装模块

export const getItem = name => {
  const data = localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') { // 如果是对象需要转为JSON
    value = JSON.stringify(value)
  }
  localStorage.setItem(name, value)
}

export const removeItem = name => {
  localStorage.removeItem(name)
}
