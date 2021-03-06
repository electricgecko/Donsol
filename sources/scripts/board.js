function Board(element)
{
  this.element = element;
  this.room = [];
  
  this.enter_room = function(starting_hand = null)
  {
    console.log("<room>");
    
    this.remove_cards();
  
    if(donsol.deck.cards.length > 0){
      this.add_card(0,donsol.deck.draw_card(starting_hand ? DIAMOND : null));
      $(this.room[0].element).delay(200).animate({ opacity: 1, top: "0" }, 200);
    }
    if(donsol.deck.cards.length > 0){
      this.add_card(1,donsol.deck.draw_card(starting_hand ? CLOVE : null));
      $(this.room[1].element).delay(250).animate({ opacity: 1, top: "0" }, 200);
    }
    if(donsol.deck.cards.length > 0){
      this.add_card(2,donsol.deck.draw_card(starting_hand ? HEART : null));
      $(this.room[2].element).delay(300).animate({ opacity: 1, top: "0" }, 200);
    }
    if(donsol.deck.cards.length > 0){
      this.add_card(3,donsol.deck.draw_card(starting_hand ? SPADE : null));
      $(this.room[3].element).delay(350).animate({ opacity: 1, top: "0" }, 200);
    }
    
    donsol.player.update();
    this.update();
  }
  
  this.add_card = function(index,card)
  {
    this.element.appendChild(card.install());
    this.room.push(card);
  }
  
  this.remove_cards = function()
  {
    this.room = [];
    this.element.innerHTML = '';
  }
  
  this.return_cards = function()
  {
    if(!this.room[0].is_flipped){ donsol.deck.return_card(this.room[0]); }
    if(!this.room[1].is_flipped){ donsol.deck.return_card(this.room[1]); }
    if(!this.room[2].is_flipped){ donsol.deck.return_card(this.room[2]); }
    if(!this.room[3].is_flipped){ donsol.deck.return_card(this.room[3]); }
  }

  this.update = function()
  {
    // Don't draw if the player is dead
    if(donsol.player.health.value < 1){
      return;
    }

    if( (!this.room[0] || this.room[0].is_flipped) && (!this.room[1] || this.room[1].is_flipped) && (!this.room[2] || this.room[2].is_flipped) && (!this.room[3] || this.room[3].is_flipped) && donsol.deck.cards.length < 1){
      this.dungeon_complete();
      return;
    }
    if(this.room[0].is_flipped && this.room[1].is_flipped && this.room[2].is_flipped && this.room[3].is_flipped){
      setTimeout(function(){ donsol.board.room_complete(); }, 1000);
    }
  }
  
  this.room_complete = function()
  {
    donsol.player.has_escaped = false;
    this.enter_room();
  }
  
  this.cards_flipped = function()
  {
    var a = [];
    if(this.room[0] && this.room[0].is_flipped){ a.push(this.room[0]); }
    if(this.room[1] && this.room[1].is_flipped){ a.push(this.room[1]); }
    if(this.room[2] && this.room[2].is_flipped){ a.push(this.room[2]); }
    if(this.room[3] && this.room[3].is_flipped){ a.push(this.room[3]); }
    return a;
  }

  this.cards_monsters = function()
  {
    var a = [];
    if(this.room[0] && this.room[0].constructor.name == "Card_Monster" && this.room[0].is_flipped === false){ a.push(this.room[0]); }
    if(this.room[1] && this.room[1].constructor.name == "Card_Monster" && this.room[1].is_flipped === false){ a.push(this.room[1]); }
    if(this.room[2] && this.room[2].constructor.name == "Card_Monster" && this.room[2].is_flipped === false){ a.push(this.room[2]); }
    if(this.room[3] && this.room[3].constructor.name == "Card_Monster" && this.room[3].is_flipped === false){ a.push(this.room[3]); }
    return a;
  }
  
  this.dungeon_complete = function()
  {
    donsol.is_complete = true;
    donsol.player.escape_button.innerHTML = "Restart";
    donsol.player.element.setAttribute("class","done");
    donsol.timeline.add_event("Completed dungeon!");
  }
  
  this.dungeon_failed = function()
  {
  }
}