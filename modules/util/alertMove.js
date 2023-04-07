const alertMove = async (msg, redirectPath) => {
  const script =
    "<script>alert('" +
    msg +
    "'); location.href = '" +
    redirectPath +
    "'</script>";
  return script;

  /**
  res.send(`
    <script>
      alert('${errMsg}')
      location.href = '${redirectURL}'
    </script>`);
  */
};

module.exports = {
  alertMove,
};

//exports.alertMove = alertMove;
