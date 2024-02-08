export function FormatCurrency(value:number){
  return value.toLocaleString("pt-br",{
    style:"currency",
    currency:"BRL",
  })
}