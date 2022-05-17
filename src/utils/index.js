const userWOPassword = (user) => {
  const { password, ...userWOPwd } = user
  return userWOPwd
}

const getDate = () => {
  let datetime = new Date()
  let dd = String(datetime.getDate()).padStart(2, '0')
  let mm = String(datetime.getMonth() + 1).padStart(2, '0')
  let yyyy = datetime.getFullYear()

  return (datetime = dd + '/' + mm + '/' + yyyy)
}

export { userWOPassword, getDate }
