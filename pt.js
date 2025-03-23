// Rewrite the text of the button on click.
const node = document.querySelector(".btn");
node.addEventListener("click", function () {
  document.querySelector(".btn").innerHTML = "Paras lund le le mera.";
});
