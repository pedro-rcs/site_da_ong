const co = {
  ID_PAYLOAD_FORMAT_INDICATOR: '00',

  ID_POINT_OF_INITIATION_METHOD: '01',

  ID_MERCHANT_ACCOUNT_INFORMATION: '26',
  ID_MERCHANT_ACCOUNT_INFORMATION_GUI: '00',
  ID_MERCHANT_ACCOUNT_INFORMATION_KEY: '01',
  ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION: '02',

  ID_MERCHANT_ACCOUNT_INFORMATION_URL: '25',

  ID_MERCHANT_CATEGORY_CODE: '52',
  ID_TRANSACTION_CURRENCY: '53',
  ID_TRANSACTION_AMOUNT: '54',
  ID_COUNTRY_CODE: '58',
  ID_MERCHANT_NAME: '59',
  ID_MERCHANT_CITY: '60',
  ID_ADDITIONAL_DATA_FIELD_TEMPLATE: '62',
  ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID: '05',
  ID_CRC16: '63'
}

// function gera_payload_estatico (amount) {
function gera_payload_estatico ({ pixKey, amount, description, merchantName, merchantCity, txid_estatico }) {

  // Ajeita os valores para o payload do PIX,
  // concatenando em uma string o ID dos campos do QRCode estático,
  // o tamanho do valor e o valor.
  const payload_format_indicator = ajeita_valores(co.ID_PAYLOAD_FORMAT_INDICATOR, '01')

  const concat_gui = ajeita_valores(co.ID_MERCHANT_ACCOUNT_INFORMATION_GUI, 'BR.GOV.BCB.PIX')
  const concat_key = ajeita_valores(co.ID_MERCHANT_ACCOUNT_INFORMATION_KEY, pixKey)
  const concat_description = ajeita_valores(co.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION, description)

  let concat_url

  const concat_merchant_account_information = ajeita_valores(co.ID_MERCHANT_ACCOUNT_INFORMATION, '' + concat_gui + concat_key + concat_description)

  const merchant_category_code = ajeita_valores(co.ID_MERCHANT_CATEGORY_CODE, '0000')
  const transaction_currency = ajeita_valores(co.ID_TRANSACTION_CURRENCY, '986')
  const transaction_amount = ajeita_valores(co.ID_TRANSACTION_AMOUNT, '' + amount)

  const country_code = ajeita_valores(co.ID_COUNTRY_CODE, 'BR')

  const merchant_name = ajeita_valores(co.ID_MERCHANT_NAME, merchantName)
  const merchant_city = ajeita_valores(co.ID_MERCHANT_CITY, merchantCity)

  const payload_txid_estatico = ajeita_valores(co.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, txid_estatico)
  const additional_data_field_template = ajeita_valores(co.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, payload_txid_estatico)

  const payload_quase = payload_format_indicator + concat_merchant_account_information + merchant_category_code + transaction_currency + transaction_amount + country_code + merchant_name + merchant_city + additional_data_field_template

  const crc16 = getCRC16(co.ID_CRC16, payload_quase)

  const payload_estatico = payload_format_indicator + concat_merchant_account_information + merchant_category_code + transaction_currency + transaction_amount + country_code + merchant_name + merchant_city + additional_data_field_template + crc16

  return payload_estatico
}

function getCRC16 (ID_CRC16, payload) {
  // ADICIONA DADOS GERAIS NO PAYLOAD
  payload += ID_CRC16 + '04'

  // DADOS DEFINIDOS PELO BACEN
  const polinomio = 0x1021
  let resultado = 0xFFFF

  // CHECKSUM
  const length = payload.length
  if (length > 0) {
    for (let offset = 0; offset < length; offset++) {
      resultado ^= payload[offset].charCodeAt(0) << 8
      for (let bitwise = 0; bitwise < 8; bitwise++) {
        if ((resultado <<= 1) & 0x10000) resultado ^= polinomio
        resultado &= 0xFFFF
      }
    }
  }

  // RETORNA CÓDIGO CRC16 DE 4 CARACTERES
  return ID_CRC16 + '04' + (+resultado).toString(16).toUpperCase()
}

function ajeita_valores (id, valor) {
  let tamanho = '' + valor.length
  // Se o tamanho for menor que 10, colocar o 0 na frente
  if (tamanho.length < 2) tamanho = '0' + tamanho

  const concatenados = '' + id + tamanho + valor
  return concatenados
}