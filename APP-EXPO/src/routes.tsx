import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Note from "./Pages/Note";
import Lista from "./Pages/Lista";
import Pasta from "./Pages/Pasta";
import Sincronizar from "./Pages/Sincronizar";
import PDF from "./Pages/PDF";
// import Login from "./Pages/User/login";
// import Perfil from "./Pages/User/user";
import { ContentApp } from "./styles";
import Sementes from "./Pages/Sementes";
import Plantios from "./Pages/Sementes/plantios";
import SementesArmazenamento from "./Pages/Sementes/sementes";
import SementesArmazenamentoForm from "./Pages/Sementes/sementesForm";
import PlantioForm from "./Pages/Sementes/plantiosForm";
import ArmazenamentoForm from "./Pages/Sementes/armazenamentoForm";

const HomeStack = createNativeStackNavigator();

const screenOptions: any = {
  headerStyle: {
    backgroundColor: "#2e2d2d",
  },

  headerTintColor: "#fff",

  headerTitleStyle: {
    fontWeight: "bold",
  },
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ ...screenOptions }}>
      <HomeStack.Screen
        name="Home"
        initialParams={{ id: 0, id_nivel: 0, numPasta: 0 }}
        component={Pasta}
      />
      <HomeStack.Screen name="Notas" component={Note} />
      <HomeStack.Screen name="Lista" component={Lista} />
      <HomeStack.Screen name="Pasta0" component={Pasta} />
      <HomeStack.Screen name="Pasta1" component={Pasta} />
      <HomeStack.Screen name="Pasta2" component={Pasta} />
      <HomeStack.Screen name="Pasta3" component={Pasta} />
      <HomeStack.Screen name="Pasta4" component={Pasta} />
      <HomeStack.Screen name="Pasta5" component={Pasta} />
      <HomeStack.Screen name="Pasta6" component={Pasta} />
      <HomeStack.Screen name="Pasta7" component={Pasta} />
      <HomeStack.Screen name="Pasta8" component={Pasta} />
      <HomeStack.Screen name="Pasta9" component={Pasta} />
    </HomeStack.Navigator>
  );
}

const SincronizarStack = createNativeStackNavigator();

function SincronizarScreen() {
  return (
    <SincronizarStack.Navigator
      screenOptions={{
        ...screenOptions,
      }}
    >
      <SincronizarStack.Screen name="Sincronizar" component={Sincronizar} />
    </SincronizarStack.Navigator>
  );
}

const PdfStack = createNativeStackNavigator();

function PdfScreen() {
  return (
    <PdfStack.Navigator
      screenOptions={{
        ...screenOptions,
      }}
    >
      <PdfStack.Screen name="PDF" component={PDF} />
    </PdfStack.Navigator>
  );
}

const SementeStack = createNativeStackNavigator();

function SementeScreen() {
  return (
    <SementeStack.Navigator
      screenOptions={{
        ...screenOptions,
      }}
    >
      <SementeStack.Screen name="Sementes" component={Sementes} />
      <SementeStack.Screen
        name="SementesArmazenamento"
        component={SementesArmazenamento}
      />
      <SementeStack.Screen
        name="SementesArmazenamentoForm"
        component={SementesArmazenamentoForm}
      />
      <SementeStack.Screen name="PlantioForm" component={PlantioForm} />
      <SementeStack.Screen
        name="ArmazenamentoForm"
        component={ArmazenamentoForm}
      />

      <SementeStack.Screen name="Plantios" component={Plantios} />
    </SementeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <ContentApp>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            card: "#2e2d2d",
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,

            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Notas.") {
                iconName = "event-note";
              } else if (route.name === "Sincronizar.") {
                iconName = "sync-alt";
              } else if (route.name === "Perfil.") {
                iconName = "person";
              } else if (route.name === "PDF.") {
                iconName = "picture-as-pdf";
              } else if (route.name === "Avisos.") {
                iconName = "notifications";
              } else if (route.name === "Sementes.") {
                return (
                  <FontAwesome5 name="seedling" size={size} color={color} />
                );
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#18b6ff",
            tabBarInactiveTintColor: "#fff",
          })}
        >
          <Tab.Screen name="Sincronizar." component={SincronizarScreen} />
          <Tab.Screen name="Notas." component={HomeStackScreen} />
          <Tab.Screen name="Sementes." component={SementeScreen} />
          <Tab.Screen name="PDF." component={PdfScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ContentApp>
  );
}
