function Card_Potion(value,type)
{
  Card.call(this,value,type);
  
  this.touch = function()
  {
    if(this.is_flipped == true){ console.log("Card is already flipped"); return; }
    this.flip();
    donsol.player.drink_potion(this.value);
    donsol.board.update();
  }
}