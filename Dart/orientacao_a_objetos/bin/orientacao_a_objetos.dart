  void main() {
  String nome = 'Laranja';
  double peso = 100.2;
  String cor = 'Verde e Amarela';
  String sabor = 'Doce e cítrica';
  int diasDesdeColheita = 40;
  bool isMadura = funcEstaMadura(diasDesdeColheita);
  Mostrarmadura(nome, diasDesdeColheita);
}
void Mostrarmadura(String nome, int dias,{String? cor= "sem cor"} ){
if (dias>=30){
  print("A $nome está madura.");
}else{
  print("A $nome está madura.");
}
  print("A $nome é $cor");
}
 
bool funcEstaMadura(int dias){
  if (dias>= 30 ){
    return true;
  }else{
   return false;
  }
}