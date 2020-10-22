var colorSudoku = (function () {
    var COLORS = [
        "#E74C3C", "#8E44AD", "#5DADE2",
        "#1ABC9C", "#52BE80", "#F7DC6F",
        "#F39C12", "#5D6D7E", "#D2B4DE"
    ]
    var init, init_board, init_game_gui, init_game,
        get_board,
        array_copy, array_exclude, array_nd, array_choose_n, get_block_xy,
        sample, check, get_user_inp, check_inp, has_dup, random_level,
        config = {
            board_size: 3,
            colors: null,
            level: 5,
            enable_block: false
        },
        stat = {
            color: null
        };

    init = function () {
        init_game();
    }

    init_game = function () {
        config.board_size = array_choose_n([3, 4], 1);
        config.level = random_level(config.board_size);
        config.colors = array_choose_n(COLORS, config.board_size);
        config.enable_block = config.board_size >= 9 && Math.sqrt(config.board_size) % 1 === 0;
        var game_board = get_board(config.board_size, config.enable_block);
        game_board = init_board(game_board, config.level);
        init_board_gui(config.board_size, game_board, config.colors);
        init_game_gui(config.colors);
    }

    init_board = function (board, num_hole) {
        var size = board.length;
        while (num_hole > 0) {
            var i = Math.floor(Math.random() * size),
                j = Math.floor(Math.random() * size);
            if (board[i][j] > 0) {
                board[i][j] = 0;
                num_hole--;
            }
        }
        return board;
    }

    get_user_inp = function () {
        var rst = array_nd([config.board_size, config.board_size]);
        var game_board = document.getElementById("board"),
            trs = game_board.getElementsByTagName("tr");

        for (var i = 0; i < trs.length; i++) {
            var tds = trs[i].getElementsByTagName("td");
            for (var j = 0; j < tds.length; j++) {
                var td = tds[j];
                var color = td.getAttribute("data-val");
                var idx = config.colors.indexOf(color);
                if (idx !== -1) {
                    rst[i][j] = idx + 1;
                }
            }
        }
        return rst;
    }

    has_dup = function (array) {
        return (new Set(array)).size !== array.length;
    }

    random_level = function (size) {
        var size = size * size,
            min = Math.ceil(size * 0.3),
            max = Math.floor(size * 0.7),
            rst = Math.floor(Math.random() * (max - min + 1) + min);
        return rst;
    }

    array_nd = function (dims) {
        if (dims.length === 0) {
            return;
        }
        var dim = dims[0];
        var array = new Array();
        for (var i = 0; i < dim; i++) {
            array[i] = array_nd(dims.slice(1));
        }
        return array;
    }

    array_choose_n = function (array, n) {
        return array.sort(function () {return Math.random() - Math.random();}).slice(0, n)
    }

    check_inp = function () {
        var inp = get_user_inp(),
            board_size = config.board_size,
            use_block = config.enable_block,
            block_size = Math.floor(Math.sqrt(board_size));

        var cols = array_nd([board_size, board_size]),
            rows = array_nd([board_size, board_size]),
            blocks;

        if (use_block) {
            var b_size = block_size * block_size;
            blocks = array_nd([b_size, b_size]);
        }
        for (var i=0; i < inp.length; i++) {
            for (var j=0; j < inp[i].length; j++) {
                var val = inp[i][j];
                if (!val) {
                    return false;
                }
                cols[i][j] = val;
                rows[j][i] = val;
                if (use_block) {
                    var block_xy = get_block_xy(i, j, block_size);
                    blocks[block_xy[0]][block_xy[1]] = val;
                }
            }
        }

        for (var idx=0; idx < board_size; idx++) {
            if (has_dup(cols[idx]) || has_dup(rows[idx])) return false;
        }

        if (use_block) {
            for (var idx=0; idx < blocks.length; idx++) {
                if (has_dup(blocks[idx])) return false;
            }
        }

        return true
    }

    check = function () {
        var rst = check_inp(),
            msg_box = document.getElementById("msg-box");
        if (rst) {
            msg_box.innerHTML = "Congrats!";
        } else {
            msg_box.innerHTML = "";
        }
    }

    array_exclude = function (a, b) {
        return a.filter(function(x) {return b.indexOf(x) < 0 })
    }

    array_copy = function (array) {
        return JSON.parse(JSON.stringify(array));
    }

    sample = function (array) {
        if (!array || array.length === 0) return;
        var idx = Math.floor(Math.random() * array.length);
        var rst = array[idx];
        return rst;
    }

    get_block_xy = function (i, j, block_size) {
        var x = (Math.floor(i / block_size) * block_size) + Math.floor(j / block_size);
        var y = ((i % block_size) * block_size) + (j % block_size);
        return [x, y];
    }

    get_board = function (size, use_block) {
        var pass = false,
            block_size = Math.floor(Math.sqrt(size));

        var array_temp = [], block_temp = [], nums = [];
            for (var idx=0; idx<size; idx++) {
                nums.push(idx+1);
            }
            array_temp = array_nd([size, size]);
            if (use_block) {
                var b_size = block_size * block_size;
                block_temp = array_nd([b_size, b_size])
            }
        while (!pass) {
            var cols = array_copy(array_temp),
                rows = array_copy(array_temp),
                blocks = array_copy(block_temp);

            for (var i=0; i<size; i++) {
                var skip_loop = false;
                for (var j=0; j<size; j++) {
                    // var block_idx = (Math.floor(i / block_size) * block_size) + Math.floor(j / block_size);
                    var block_xy = get_block_xy(i, j, block_size);
                    var available_items = array_exclude(nums, cols[i]);
                    available_items = array_exclude(available_items, rows[j]);
                    if (use_block) {
                        available_items = array_exclude(available_items, blocks[block_xy[0]]);
                    }
                    var num = sample(available_items);
                    if (!num) {
                        skip_loop = true;
                        break;
                    }
                    cols[i][j] = num;
                    rows[j][i] = num;
                    if (use_block) {
                        blocks[block_xy[0]][block_xy[1]] = num;
                    }
                    if (i === size - 1 && j === size - 1) {
                        pass = true;
                    }
                }
                if (skip_loop) {
                    break;
                }
            }
            if (pass) {
                return cols;
            }
        }
    }

    init_board_gui = function (size, game_board, colors) {
        var boardW = 400;
        var board = document.createElement("table");
        board.id = "board";
        board.style.width = boardW + "px";
        board.style.height = boardW + "px";
        var boardBody = document.createElement("tbody");
        board.append(boardBody);

        var boxSize = Math.floor(boardW / size) - 4;
        var box = document.createElement("td");
        box.classList.add("board-box");
        box.style.width = boxSize + "px";
        box.style.height = boxSize + "px";
        var boardTrTemp = document.createElement("tr");

        var box_on_click = function () {
            var box = this,
                color = stat.color;
            if (box.getAttribute("data-val") === color) {
                box.style.backgroundColor = "";
                box.setAttribute("data-val", "");
            } else {
                box.style.backgroundColor = color;
                box.setAttribute("data-val", color);
            }
            check();
        }

        for (var i = 0; i < size; i++) {
            var boardTr = boardTrTemp.cloneNode();
            for (var j = 0; j < size; j++) {
                var ele = box.cloneNode();
                var color_id = game_board[i][j];
                if (color_id > 0) {
                    var color = colors[color_id - 1];
                    ele.classList.add("board-box-fixed");
                    ele.style.backgroundColor = color;
                    ele.setAttribute("data-val", color);
                } else {
                    ele.setAttribute("data-val", "");
                    ele.addEventListener("click", box_on_click);
                }
                boardTr.appendChild(ele);
            }
            boardBody.append(boardTr);
        }
        var board_node = document.getElementsByClassName("game-board")[0];
        board_node.innerHTML = "";
        board_node.append(board);
    }

    init_game_gui = function (colors) {
        var box = document.getElementById("btn-color-box");
        // var btn_w = Math.floor(box.clientWidth * 0.8 / colors.length);
        var btn_color_temp = document.createElement("div");
        btn_color_temp.classList.add("btn-color");
        var class_select = "btn-color-select";
        box.innerHTML = "";
        document.getElementById("msg-box").innerHTML = "";

        var btn_color_on_click = function () {
            var btn = this;
            stat.color = btn.getAttribute("data-color");
            if (btn.classList.contains(class_select)) {

            } else {
                var curr_selected_btn = document.querySelector("." + class_select);
                curr_selected_btn.classList.remove(class_select);
                btn.classList.add(class_select);
            }
        }

        for (var idx=0; idx < colors.length; idx++) {
            var ele = btn_color_temp.cloneNode();
            ele.style.backgroundColor = colors[idx];
            if (idx===0) {
                ele.classList.add(class_select);
                stat.color = colors[idx];
            }
            ele.setAttribute("data-color", colors[idx]);
            ele.addEventListener("click", btn_color_on_click);
            box.append(ele);
        }

        document.getElementById("btn-new").addEventListener("click", function () {
            init_game();
        })
    }

    return {
        init: init
    }
})();

colorSudoku.init();