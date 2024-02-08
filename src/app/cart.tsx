import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { InputInformations } from "@/components/input";
import { LinkButton } from "@/components/link_button";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-stores";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Cart(){
  const navigation = useNavigation();
  const [addres, setAddres] = useState('');
  const cartStore = useCartStore(); 
  const PHONE_NUMBER = '5514996112228'
  const total = FormatCurrency(cartStore.products.reduce((total,product) => total + product.price * product.quantity,0))

  function handleProductRemove(product: ProductCartProps){
    Alert.alert('Remover', `Deseja Remover ${product.title} do carrinho?`,[
      {
        text:'Cancelar',
      },
      {
        text:'Remover',
        onPress: () => cartStore.remove(product.id),
      }
    ])
  }

  function handleOrder(){
    if(addres.trim().length === 0){
      return Alert.alert('Pedido', 'Informe os dados da entrega!')
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`)
    .join("")
  
    const message = `
      Novo Pedido ✅😍
      \n Entregar em : ${addres}

      ${products}

      \n Valor total : ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
    cartStore.clear()
    navigation.goBack();
  }

  return(
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho"/>
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      extraHeight={100}
      >
    <ScrollView>
      {
        cartStore.products.length > 0 ? (
          <View className="p-5 flex-1">
        {
          cartStore.products.map((product) => (
            <Product key={product.id} data={product} 
            onPress={() => handleProductRemove(product)}/>
          ))
        }
      </View>
        ) 
        : 
        (
        <Text className="font-body text-slate-400 text-center my-8">
          Seu carrinho está vazio!
        </Text>
        )
      }    
      </ScrollView>
      </KeyboardAwareScrollView>
      <View className="flex-row gap-3  items-center mt-5 mb-4 border-t border-slate-700 mx-4">
          <Text className="text-white text-xl font-subtitle ">
            Total:
          </Text>
          <Text className="text-lime-400 text-2xl font-heading">
            {total}
          </Text>
      </View>

      <InputInformations 
      
      blurOnSubmit={true}
      onChangeText={setAddres}
      placeholder="Informe o endereço de entrega, rua , bairro , número e complem."/>

      <View className="gap-5 p-5">
        <Button onPress={handleOrder}>
        <Button.Text>
          Enviar Pedido
        </Button.Text>
        <Button.Icon>
          <Feather name="arrow-right-circle" size={20}/>
        </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápido" href="/"/>
      </View>
    </View>
  )
}