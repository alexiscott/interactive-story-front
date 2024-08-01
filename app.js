const storyTree = {
  id: 1,
    text: "You are in a forest. You see two paths.",
    graphic: "choose-path-opt",
  choices: [
    {
      id: 2,
      text: "Take the left path",
      next: {
        id: 3,
          text: "You encounter a wolf.",
	  graphic: "choose-path-opt",
        choices: [
          {
            id: 4,
              text: "Fight the wolf",
	      graphic: "choose-path-opt",
            next: {
              id: 5,
		text: "You defeated the wolf. You win!",
		graphic: "choose-path-opt",
              choices: []
            }
          },
          {
            id: 6,
            text: "Run away",
            next: {
              id: 7,
		text: "You got away safely. You win!",
		graphic: "choose-path-opt",
              choices: []
            }
          }
        ]
      }
    },
    {
      id: 8,
	text: "Take the right path",
		      graphic: "choose-path-opt.svg",
      next: {
        id: 9,
          text: "You find a treasure chest.",
	  	      graphic: "choose-path-opt.svg",
        choices: [
          {
            id: 10,
              text: "Open the chest",
	      	      graphic: "choose-path-opt.svg",
            next: {
              id: 11,
		text: "The chest is full of gold. You win!",
			  graphic: "choose-path-opt.svg",
              choices: []
            }
          },
          {
            id: 12,
              text: "Leave the chest",
	      	      graphic: "choose-path-opt.svg",
            next: {
              id: 13,
		text: "You walk away. Game over.",
			  graphic: "choose-path-opt.svg",
              choices: []
            }
          }
        ]
      }
    }
  ]
};

let currentNode = storyTree;
const history = [];

const storyDiv = document.getElementById('story');
const backButton = document.getElementById('back-button');

function renderNode(node) {
    storyDiv.innerHTML = `<p>${node.text}</p>`;
    	console.log("node", node);
  if (node.choices.length > 0) {
    const choicesList = document.createElement('ul');
    node.choices.forEach(choice => {
	const choiceItem = document.createElement('li');
	choiceItem.textContent = choice.text;
	const choiceItemPic = document.createElement('img');
	choiceItemPic.src= "choose-path-opt.svg";
	// choiceItemPic.src = choice.graphic;
	choiceItemPic.width="600";
	choiceItemPic.height="600";
	choiceItem.onclick = () => handleChoice(choice.next);
	choicesList.appendChild(choiceItem);
	// choicesList.appendChild(choiceItemPic);
	// console.log(choice.graphic);
    });
    storyDiv.appendChild(choicesList);
  } else {
    storyDiv.innerHTML += '<p>The end.</p>';
  }
  backButton.style.display = history.length > 0 ? 'block' : 'none';
}

function handleChoice(nextNode) {
  history.push(currentNode);
  currentNode = nextNode;
  renderNode(currentNode);
}

backButton.onclick = () => {
  currentNode = history.pop();
  renderNode(currentNode);
};

// Initial render
renderNode(currentNode);
