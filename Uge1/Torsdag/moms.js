const knap = document.querySelector("#result");
result.addEventListener("click", momsBeregner);
function momsBeregner(beloeb, moms) {
  const momsSats = 0.25;
  beloeb = 100;
  moms = beloeb * momsSats;
  const result = moms + beloeb;
  console.log(result);
  console.log(
    (result.textContent =
      "Med moms bliver resultatet" + " " + result + " " + "kr."),
  );
}
