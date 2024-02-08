import { Button } from "@/components/button";
import { LinkButton } from "@/components/link_button";
import { useCartStore } from "@/stores/cart-stores";
import { PRODUCTS } from "@/utils/data/products";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";



export default function Product(){
  const {id} = useLocalSearchParams();
  const navigation = useNavigation();
  const product = PRODUCTS.find((item) => item.id === id)
  const cartStore = useCartStore()

  function handleAddProductToCart(){
    cartStore.add(product!)
    navigation.goBack()
  }

  if(!product){
    return <Redirect href="/"/>
  }

  return(
    <View className="flex-1">
        <Image source={product.cover} className="w-full h-52" resizeMode="cover"/>

      <View className="p-5 mt-8 flex-1">
      <Text className="text-xl font-heading text-white">
          {product.title}
        </Text>
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {FormatCurrency(product.price)}
        </Text>

        <Text className="text-base text-slate-400 font-body leading-6 mb-6"> 
        {product.description}
        </Text>

        {
          product.ingredients.map((ingredient) => (
            <Text 
            className="text-slate-400 font-body text-base leading-6"
            key={ingredient}>
             {"\u2022"} {ingredient}
              </Text>
          ))
        }
      
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddProductToCart}>
        <Button.Icon>
          <Feather name="plus-circle" size={20}/>
        </Button.Icon>

        <Button.Text>Adicionar Pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao Cardápio" href="/"/>
      </View>
    </View>
  )
}