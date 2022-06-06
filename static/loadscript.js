document.onreadystatechange = function() 
{
  if (document.readyState != "complete") 
  {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#chargement").style.visibility = "visible";
  } 
  else 
  {
    document.querySelector("#chargement").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};