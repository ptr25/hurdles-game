class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(200,100);
    car1.addAnimation("car1",car1_img);
    car2 = createSprite(200,300);
    car2.addAnimation("car2",car2_img);
    car3 = createSprite(200,500);
    car3.addAnimation("car3",car3_img);
    car4 = createSprite(200,700);
    car4.addAnimation("car4",car4_img);
    cars = [car1, car2, car3, car4];
    hurdle1 = createSprite(displayWidth/2,700);
    hurdle1.addImage(hurdle);
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
  
    if(allPlayers !== undefined){
      background(ground);
      image(track, 0,0,displayWidth*4, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x ;
      var y = 0;
 
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 200;
       // y = y - allPlayers[plr].jump;
        //use data form the database to display the cars in y direction
        x = displayWidth + allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x =cars[index-1].x;
          camera.position.y = displayHeight/2;
          
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
   // if(keyDown("space") && player.index !== null){
    //  player.jump +=10; 
    //}
    if(player.distance > 4400){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);

text("Your Rank is: "+ player.rank, x+150, displayHeight/2);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);

  }
}
