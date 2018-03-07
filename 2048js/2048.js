// JavaScript Document

var grid = document.getElementById("grid"), 
gridElements = grid.getElementsByTagName("div");

// 二位数组存储表格数据
var array = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

/*grid function*/

// 数组初始化
function resetArry() {
	for(var i = 0;i < array.length; i++){
		for(var j = 0; j < array.length; j++){
			array[i][j] = 0;
		}
	}
}

// 初始化界面
function intitGrid() {
//数组初始化为0
	resetArry();
//生成开始的2个数
	var i1, j1, i2, j2;
	do{
		i1 = getRandom(4); j1 = getRandom(4); 
		i2 = getRandom(4); j2 = getRandom(4);	
	}while(i1 === i2 && j1 === j2);
	array[i1][j1] = 2;
	array[i2][j2] = 2;
	updateGrid();
}

// 刷新grid
function updateGrid() {
	for(var i = 0;i < array.length; i++) {
		for(var j = 0; j < array.length; j++) {
			if (array[i][j] > 0) {
				//有数据
				gridElements[i*4 + j].className = 'b' + array[i][j];		// 设置背景色
				gridElements[i*4 + j].innerHTML = array[i][j];				// 改变数值
			}
			else {
				//数据为0
				gridElements[i*4 + j].className = "bv";						// 为0， 清除背景样式
				gridElements[i*4 + j].innerHTML = '';						// 数值清除
			}
		}
	}
}
/*
	移动问题上 ， 解决在移动后是否生成数字的问题
	1、能否合并数字
	2、若不能合并数字，判断是否存在移动
	若以上两点有一项符合，则需生成数字
	
	ps. flag （0：不生成数字； 1： 生成数字）
	
	解决思路：  在移动函数中添加flag标记， 初始为0；  若以上两点有一点执行， 则flag = 1；  
			  返回flag的值
				
*/
// 上
function moveUp() {
	var i, j;
	var flag = 0;
    for (i = 0; i < 4; i++) {
        var k = 0;
        var x = 0;
        var y = 0;
        for (j = 0; j < 4; j++) {
            if (k === array[j][i] && k !== 0) {
                array[x][y] = 2*k;
                array[j][i] = 0;
                k = 0;
				flag = 1;
                continue;
            }
            if (array[j][i] !== 0) {
                k = array[j][i];
                x = j;
                y = i;
            }
        }
    }

    for (i=0; i<4; i++) {
        var z = 0;
        for (j = 0; j < 4; j++) {
            if(array[j][i]) {
                if (z !== j) {
                    array[z][i] = array[j][i];
                    array[j][i] = 0;
					flag = 1;
                }
                z++;
            }
        }
    }
	return flag;
}

// 下
function moveDown() {
	var i,j;
	var flag = 0;
    for (i = 0; i < 4; i++) {
        var k = 0;
        var x = 0;
        var y = 0;
        for (j = 3; j >= 0; j--) {
            if (k === array[j][i] && k !== 0) {
                array[x][y] = 2*k;
                array[j][i] = 0;
                k = 0;
				flag = 1;
                continue;
            }
            if (array[j][i] !== 0) {
                k = array[j][i];
                x = j;
                y = i;
            }
        }
    }

    for (i = 0; i < 4; i++) {
        var z = 3;
        for (j = 3; j >= 0; j--) {
            if (array[j][i]) {
                if (z !== j) {
                    array[z][i] = array[j][i];
                    array[j][i] = 0;
					flag = 1;
                }
                z--;
            }
        }
    }
	return flag;
}

// 左
function moveLeft() {
 var i,j;
 var flag = 0;
    for (i = 0; i < 4; i++) {
        var k = 0;
        var x = 0;
        var y = 0;
        for (j = 0; j < 4; j++) {
            if (k === array[i][j] && k !== 0) {
                array[x][y] = 2*k;
                array[i][j] = 0;
                k = 0;
				flag = 1;
                continue;
            }
            if (array[i][j] !== 0) {
                k = array[i][j];
                x = i;
                y = j;
            }
        }

    }

    for (i = 0; i < 4; i++) {
        var z = 0;
        for (j = 0; j < 4; j++) {
            if (array[i][j]) {
                if (z !== j) {
                    array[i][z] = array[i][j];
                    array[i][j] = 0;
					flag = 1;
                }
                z++;
            }
        }
    }
	return flag;
}

// 右
function moveRight() {
 var i,j;
 var flag = 0;
    for (i = 0; i < 4; i++) {
        var k = 0;
        var x = 0;
        var y = 0;
        for (j = 3; j >= 0; j--) {
            if (k === array[i][j] && k !== 0) {
                array[x][y] = 2*k;
                array[i][j] = 0;
                k = 0;
				flag = 1;
                continue;
            }
            if (array[i][j] !== 0) {
                k = array[i][j];
                x = i;
                y = j;
            }
        }
    }

    for (i = 0; i < 4; i++) {
        var z = 3;
        for (j = 3; j >= 0; j--) {
            if (array[i][j]) {
                if (z !== j) {
                    array[i][z] = array[i][j];
                    array[i][j] = 0;
					flag = 1;
                }
                z--;
            }
        }
    }
	return flag;
}

/*function keyPress() {
	if(Event.keyCode == 38) {
		moveUp();			// 上
		alert("shang");}
	else if(Event.keyCode == 40)
		moveDown();			// 下
	else if(Event.keyCode == 37)
		moveLeft();			// 左		
	else if(Event.keyCode == 39)
		moveRight();		// 右	
	// 移动完成后，空白处生成随机数
	console.log(array);
	insertNum();
	// 刷新grid
	updateGrid();	
}*/

/*function keyPress() {
	if(event.keyCode == 37) {
		moveLeft();			alert("shang");}
	else if(Event.keyCode == 38)
		moveUp();			// 下
	else if(Event.keyCode == 39)
		moveRight();			// 左		
	else if(Event.keyCode == 40)
		moveDown();		// 右	
	// 移动完成后，空白处生成随机数
	console.log(array);
	insertNum();
	// 刷新grid
	updateGrid();	
}*/

function keyPress(code) {
	if(code == 37 || code == 74) {
		if(moveLeft()) {	// left
			insertNum();
		}
	}
	else if(code == 38 || code == 73) {
		if(moveUp()) { 		// up
			insertNum();
		}
	}
	else if(code == 39 || code == 76) {
		if(moveRight()) { 	// right
		insertNum();
		}
	}
	else if(code == 40 || code == 75) {
		if(moveDown()) { 	// down
		insertNum();
		}
	}
	// console.log(array);
	// 刷新grid
	updateGrid();
	if(!gameOver()) {
		alert("you lose");
	}
	if(gameWin()) {
		alert("you win");
	}
}

// 插入num

/*function insertNum() {
	var x, y, randValue;
	while(1){
		randValue = (Math.floor(getRandom(5) > 2 ? 4 : 2));
		x = Math.floor(getRandom(4));
		y = Math.floor(getRandom(4));
		if(grid[x][y] == 0) {
			grid[x][y] = randValue;
			break;
		} else {
			// if(!GridMovable()) {
			//	gameOver();
			//}
		}
	}		
}*/

function insertNum() {
	var x, y, possibles = [];

	for(y = 0; y < 4; y++) {
		for(x = 0; x < 4; x++) {
			if(array[y][x] == 0)
				possibles.push([x, y]);
		}
	}

	if(possibles.length) {
	console.log(possibles.length);
		var randomValue = (Math.floor(Math.random() * 9) > 4 ? 2 : 4),
			randomBlock = possibles[(Math.floor(Math.random() * possibles.length))],
			x = randomBlock[0],
			y = randomBlock[1];
			array[y][x] = randomValue;
	} else {
		
	}
}

// 判断垂直方向能否移动
function verti() {
	var i, j, k;
	for(i = 0; i < array.length; i++) {
		k = 0;
		for(j = 0; j < array.length; j++) {
			if(k == array[j][i] && k != 0) {
				return true;
			}
			if(array[j][i] != 0) {
				k = array[j][i];
			}
		}
	}
	return false;
}

// 判断水平方向能否移动
function hori() {
	var i, j, k;
	for(i = 0; i < array.length; i++) {
		k = 0;
		for(j = 0; j < array.length; j++) {
			if(k == array[i][j] && k != 0) {
				return true;
			}
			if(array[i][j] != 0) {
				k = array[i][j];
			}
		}
	}
	return false;	
}

// 判断游戏胜利
function gameWin() {
	// 判断是否有2048
	var i, j;
	for(i = 0; i < array.length; i++) {
		for(j = 0; j < array.length; j++) {
			if(array[i][j] == 2048)
			return true;
		}
	}
	return false;
}

// 判断游戏结束
function gameOver() {
	if(blank_num()) {
		return true;
	}
	// 遍历判断各元素所在行列是否能移动
	if(verti() || hori()) {
		return true;
	}
	return false;
}

// 统计空白个数
function blank_num() {
	var i, j, num = 0;
	for(i = 0; i < array.length; i++) {
		for(j = 0; j < array.length; j++) {
			if(array[i][j] == 0)
				return true;
		}
	}
	return false;
}

intitGrid();

document.getElementById("NewGame_btn").addEventListener("click", intitGrid, false);

/*document.onkeydown = keyPress;
*/
document.onkeydown = function(e) { 
	keyPress(e.keyCode); 
}
// 生成随机数，0-n之间
function getRandom(n) {
	return Math.floor(Math.random()*n);
	// Math.floor()向下取整    Math.random()生成0-1的值
}









