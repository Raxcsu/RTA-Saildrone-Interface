float Lati = 0.0;
float Long = 0.0;
int Bate = 0;
float Amp1 = 0.0;
float Amp2 = 0.0;
float Temp = 0.0;

float dLati,dLong,dAmp1,dAmp2,dTemp;
//char buffer[40];

void setup() {
  Serial.begin(115200);
  Serial.println("Inicializando comunicacion");
}

void loop() {
  Lati = random(20, 25);
  dLati = random(1, 99)/100.0;
  Lati = Lati + dLati;
  
  Long = random(20, 40);
  dLong = random(1, 99)/100.0;
  Long = Long + dLong;
  
  Bate = random(45, 50);

  Amp1 = random( 2, 12);
  dAmp1 = random(1, 99)/100.0;
  Amp1 = Amp1 + dAmp1;
  
  Amp2 = random( 2, 12);
  dAmp2 = random(1, 99)/100.0;
  Amp2 = Amp2 + dAmp2;
  
  Temp = random(18, 26);
  dTemp = random(1, 99)/100.0;
  Temp = Temp + dTemp;
  
  //sprintf(buffer, "%2d-%2d-%2d-%2d-%2d-%2f", Lati, Long, Bate, Amp1, Amp2, Temp);
  //Serial.println(buffer);
  Serial.print(Lati); Serial.print("|");
  Serial.print(Long); Serial.print("|");
  Serial.print(Bate); Serial.print("|");
  Serial.print(Amp1); Serial.print("|");
  Serial.print(Amp2); Serial.print("|");
  Serial.println(Temp);
  delay(100);
}
