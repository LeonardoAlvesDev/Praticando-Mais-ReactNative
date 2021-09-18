import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image, Header} from 'react-native';
import Constants from 'expo-constants';

const ShowDetalhes = ({titulo,onPress}) => (
  <View>
    <Pressable onPress={onPress}>
      <Text style={styles.items}>{titulo}</Text>
    </Pressable>
  </View>
)

async function executeGet(url,jsonState){
  
    //get síncrono com o uso do fetch
    await fetch(url)
    .then(response => {
          if (response.status === 200) {
            //console.log('sucesso');
            response.json().then(function(result){ 

              //console.log(result);
              jsonState(result)

              });
          } else {
            throw new Error('Erro ao consumir a API!');
          }
      })
      .then(response => {
        //console.debug(response);
      }).catch(error => {
        console.error(error);
      });
}

const Infos = ({name, username, email, phone, companyName}) => {

  const [modal, setModal] = React.useState(false)

  var info = "\nUsername: " + username + 
               "\nEmail: " + email +
               "\nPhone: " + phone +
               "\nCompany: " + companyName

  function mudaModal(){
    setModal(!modal)
  }

  return (
    <View>
      <ShowDetalhes titulo = {name} 
                    onPress = {() => alert(info)}
      />
    </View>
  )
}

const ListHeader = () => (

  <Text style={styles.topo}>Lista de contatos</Text>
)

export default function App() {

  const [jsonData, setJsonData] = React.useState({})

  executeGet("https://jsonplaceholder.typicode.com/users", setJsonData)

  //função que renderiza cada item do FlatList
  function meuItem ({item}){

    var name = item.name

    return(
      <Infos name={item.name}
             username={item.username}
             email={item.email}
             phone={item.phone}
             companyName={item.company.name}
      />
    )
  } 

  return (

    <View style={styles.container}>
    
      <FlatList
        ListHeaderComponent = {ListHeader}
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#D3D3D3',
    padding: 8,
  },
  items: {
    padding: 15,
    margin: 20,
    marginTop: 10,
    borderRadius: 80,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#C0C0C0'
  },
  topo:{
    padding: 20,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#A9A9A9'
  }
});
