require('dotenv').config()
const nodemailer = require('nodemailer')
  
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.EMAIL_ENDERECO,
    pass: process.env.EMAIL_SENHA
  }
})

module.exports = {
  dispara_email: function (tipo, coisas) {

    let html
    let texto
    let mailOptions
    
    if (tipo === 'msg_site_cliente') {
      html = `Não responda este e-mail!!<br><br>O contato foi feito através de seu site. Para entrar em contato com quem te mandou esta mensagem, vocẽ pode enviar um e-mail para: ${coisas.email}<br><br>Site da Ong - Contato pelo seu site<br><br>Nome: ${coisas.nome}<br>E-mail: ${coisas.email}<br>Mensagem: ${coisas.mensagem}`
      texto = `Não responda este e-mail!! ----- O contato foi feito através de seu site. Para entrar em contato com quem te mandou esta mensagem, vocẽ pode enviar um e-mail para: ${coisas.email}-----Site da Ong - Contato pelo seu site---Nome: ${coisas.nome}----E-mail: ${coisas.email}----Mensagem: ${coisas.mensagem}`

      mailOptions = {
        from: process.env.EMAIL_ENDERECO,
        to: process.env.EMAIL_ENDERECO,
        subject: 'Site da ONG - Contato pelo seu site',
        text: texto,
        html: html
      }
    }

    if (tipo == 'contato_sdo') {
      html = `<br>Site da Ong - Contato pelo site<br><br>Nome: ${coisas.nome}<br>E-mail: ${coisas.email}<br>Mensagem: ${coisas.mensagem}`
      texto = `Site da Ong - Contato pelo site---Nome: ${coisas.nome}----E-mail: ${coisas.email}----Mensagem: ${coisas.mensagem}`

      mailOptions = {
        from: process.env.EMAIL_ENDERECO,
        to: process.env.EMAIL_ENDERECO,
        subject: 'Site da ONG - Contato pelo site',
        text: texto,
        html: html
      }
    }

    if (tipo == 'altera_senha') {
      const link_token = `http://${process.env.IP_SERVIDOR}:${process.env.PORTA_SERVIDOR}/altera_senha?token=${coisas.token_senha}`

      html = `<br>Olá <br><br>Esqueceu a senha né ${coisas.nome}.<br><br>Tudo bem, click neste link abaixo e faça uma nova!<br>${link_token}<br>Se não foi você quem pediu a alteração de senha, ignore totalmente esta mensagem!`
      texto = `Olá ${coisas.nome}. Para trocar a senha, copie e cole o seguinte endereço na barra de endereço de seu navegar: ${link_token}`

      mailOptions = {
        from: process.env.EMAIL_ENDERECO,
        to: coisas.email,
        subject: 'SISTEMA - Alteração de senha',
        text: texto,
        html: html
      }
    }

    if (tipo == 'confirma_cadastro') {
      const link_token = `http://${process.env.IP_SERVIDOR}:${process.env.PORTA_SERVIDOR}/confirma?token=${coisas.token}`
      html = `<br>Olá ${coisas.nome}.<br><br>Confirme seu cadastro por gentileza, clicando no linkão abaixo!<br><br>${link_token}<br><br>Este link expirará em 12 horas, então seja veloz!!<br>Gracias!!`
      texto = `Olá ${coisas.nome}. copie e cole o link a seguir na barra de endereço de seu navegador para confirmar seu cadastro. O link só dura doze horas, então hurry up bróda: ${link_token}  Muito obrigado!`

      mailOptions = {
        from: process.env.EMAIL_ENDERECO,
        to: coisas.email,
        subject: 'Confirmação de Cadastro',
        text: texto,
        html: html
      }
    }

    if (tipo == 'cadastro_confirmado_bem_vindo') {
      html = `<br>Seja bem-bindo ao site qe você acabou de fazer a confirmação ${coisas.nome}.<br><br>Aqui vai uma breve apresentação das coisas que poderás fazer. Óia que maraviya!!`
      texto = `Olá ${coisas.nome}. Bem vindíssimo. Aqui vai uma breve apresentação das coisas que você pode fazer nesse sistema.`

      mailOptions = {
        from: process.env.EMAIL_ENDERECO,
        to: coisas.email,
        subject: 'Seja bem vindo ao nosso Sistemóvski',
        text: texto,
        html: html
      }
    }
      
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email enviado: ' + info.response)
        return
      }
    })
  }

}