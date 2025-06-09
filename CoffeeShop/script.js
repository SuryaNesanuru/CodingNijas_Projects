function showSpecial() {
  const specials = [
    "Vanilla Cold Brew - $4.50",
    "Hazelnut Latte - $4.75",
    "Caramel Macchiato - $5.00"
  ];
  const random = Math.floor(Math.random() * specials.length);
  document.getElementById("special").innerText = "☕ " + specials[random];
}
