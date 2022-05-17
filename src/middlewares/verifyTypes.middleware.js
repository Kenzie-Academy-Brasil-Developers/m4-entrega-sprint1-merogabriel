const verifyTypes = (req, res, next) => {
  const { name, email, password, isAdmin } = req.body

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return res
      .status(400)
      .json({ err: 'Entrada de daaados com formato errado.' })
  } else if (isAdmin && typeof isAdmin !== 'boolean') {
    return res.status(400).json({ err: 'Entrada de dados com formato errado.' })
  }

  req.body.name = name
  req.body.password = password
  req.body.email = email

  if (isAdmin) {
    req.body.isAdmin = isAdmin
  }

  next()
}

export default verifyTypes
