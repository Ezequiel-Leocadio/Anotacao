import { StyleSheet } from 'react-native';

const customModalStyles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
  },
  modalView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    height: 250,
    backgroundColor: '#615c5c',
    borderRadius: 10,
    paddingHorizontal: 15,
    // paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 8,
    elevation: 20,
  },
  textSize: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
  },
});

export default customModalStyles;
