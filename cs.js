var colorSudoku = (function () {
    var COLORS = [
        "#E74C3C", "#8E44AD", "#5DADE2",
        "#1ABC9C", "#4dd888", "#F7DC6F",
        "#F39C12", "#226dbd", "#D2B4DE"
    ]
    var BOARDS = {
        3: [
            "123 231 312",
            "123 312 231",
        ],
        4: [
            "1234 2341 3412 4123",
            "1234 2341 4123 3412",
            "1234 3412 2341 4123",
            "1234 3412 4123 2341",
            "1234 4123 2341 3412",
            "1234 4123 3412 2341",
        ],
        5: [
            "12345 23451 34512 45123 51234",
            "12345 23451 34512 51234 45123",
            "12345 23451 45123 34512 51234",
            "12345 23451 45123 51234 34512",
            "12345 23451 51234 34512 45123",
            "12345 23451 51234 45123 34512",
            "12345 34512 23451 45123 51234",
            "12345 34512 23451 51234 45123",
            "12345 34512 45123 23451 51234",
            "12345 34512 45123 51234 23451",
            "12345 34512 51234 23451 45123",
            "12345 34512 51234 45123 23451",
            "12345 45123 23451 34512 51234",
            "12345 45123 23451 51234 34512",
            "12345 45123 34512 23451 51234",
            "12345 45123 34512 51234 23451",
            "12345 45123 51234 23451 34512",
            "12345 45123 51234 34512 23451",
            "12345 51234 23451 34512 45123",
            "12345 51234 23451 45123 34512",
            "12345 51234 34512 23451 45123",
            "12345 51234 34512 45123 23451",
            "12345 51234 45123 23451 34512",
            "12345 51234 45123 34512 23451",
        ],
        6: [
            "123456 234561 345612 456123 561234 612345",
            "123456 234561 345612 456123 612345 561234",
            "123456 234561 345612 561234 456123 612345",
            "123456 234561 345612 561234 612345 456123",
            "123456 234561 345612 612345 456123 561234",
            "123456 234561 345612 612345 561234 456123",
            "123456 234561 456123 345612 561234 612345",
            "123456 234561 456123 345612 612345 561234",
            "123456 234561 456123 561234 345612 612345",
            "123456 234561 456123 561234 612345 345612",
            "123456 234561 456123 612345 345612 561234",
            "123456 234561 456123 612345 561234 345612",
            "123456 234561 561234 345612 456123 612345",
            "123456 234561 561234 345612 612345 456123",
            "123456 234561 561234 456123 345612 612345",
            "123456 234561 561234 456123 612345 345612",
            "123456 234561 561234 612345 345612 456123",
            "123456 234561 561234 612345 456123 345612",
            "123456 234561 612345 345612 456123 561234",
            "123456 234561 612345 345612 561234 456123",
            "123456 234561 612345 456123 345612 561234",
            "123456 234561 612345 456123 561234 345612",
            "123456 234561 612345 561234 345612 456123",
            "123456 234561 612345 561234 456123 345612",
            "123456 345612 234561 456123 561234 612345",
            "123456 345612 234561 456123 612345 561234",
            "123456 345612 234561 561234 456123 612345",
            "123456 345612 234561 561234 612345 456123",
            "123456 345612 234561 612345 456123 561234",
            "123456 345612 234561 612345 561234 456123",
            "123456 345612 456123 234561 561234 612345",
            "123456 345612 456123 234561 612345 561234",
            "123456 345612 456123 561234 234561 612345",
            "123456 345612 456123 561234 612345 234561",
            "123456 345612 456123 612345 234561 561234",
            "123456 345612 456123 612345 561234 234561",
            "123456 345612 561234 234561 456123 612345",
            "123456 345612 561234 234561 612345 456123",
            "123456 345612 561234 456123 234561 612345",
            "123456 345612 561234 456123 612345 234561",
            "123456 345612 561234 612345 234561 456123",
            "123456 345612 561234 612345 456123 234561",
            "123456 345612 612345 234561 456123 561234",
            "123456 345612 612345 234561 561234 456123",
            "123456 345612 612345 456123 234561 561234",
            "123456 345612 612345 456123 561234 234561",
            "123456 345612 612345 561234 234561 456123",
            "123456 345612 612345 561234 456123 234561",
            "123456 456123 234561 345612 561234 612345",
            "123456 456123 234561 345612 612345 561234",
            "123456 456123 234561 561234 345612 612345",
            "123456 456123 234561 561234 612345 345612",
            "123456 456123 234561 612345 345612 561234",
            "123456 456123 234561 612345 561234 345612",
            "123456 456123 345612 234561 561234 612345",
            "123456 456123 345612 234561 612345 561234",
            "123456 456123 345612 561234 234561 612345",
            "123456 456123 345612 561234 612345 234561",
            "123456 456123 345612 612345 234561 561234",
            "123456 456123 345612 612345 561234 234561",
            "123456 456123 561234 234561 345612 612345",
            "123456 456123 561234 234561 612345 345612",
            "123456 456123 561234 345612 234561 612345",
            "123456 456123 561234 345612 612345 234561",
            "123456 456123 561234 612345 234561 345612",
            "123456 456123 561234 612345 345612 234561",
            "123456 456123 612345 234561 345612 561234",
            "123456 456123 612345 234561 561234 345612",
            "123456 456123 612345 345612 234561 561234",
            "123456 456123 612345 345612 561234 234561",
            "123456 456123 612345 561234 234561 345612",
            "123456 456123 612345 561234 345612 234561",
            "123456 561234 234561 345612 456123 612345",
            "123456 561234 234561 345612 612345 456123",
            "123456 561234 234561 456123 345612 612345",
            "123456 561234 234561 456123 612345 345612",
            "123456 561234 234561 612345 345612 456123",
            "123456 561234 234561 612345 456123 345612",
            "123456 561234 345612 234561 456123 612345",
            "123456 561234 345612 234561 612345 456123",
            "123456 561234 345612 456123 234561 612345",
            "123456 561234 345612 456123 612345 234561",
            "123456 561234 345612 612345 234561 456123",
            "123456 561234 345612 612345 456123 234561",
            "123456 561234 456123 234561 345612 612345",
            "123456 561234 456123 234561 612345 345612",
            "123456 561234 456123 345612 234561 612345",
            "123456 561234 456123 345612 612345 234561",
            "123456 561234 456123 612345 234561 345612",
            "123456 561234 456123 612345 345612 234561",
            "123456 561234 612345 234561 345612 456123",
            "123456 561234 612345 234561 456123 345612",
            "123456 561234 612345 345612 234561 456123",
            "123456 561234 612345 345612 456123 234561",
            "123456 561234 612345 456123 234561 345612",
            "123456 561234 612345 456123 345612 234561",
            "123456 612345 234561 345612 456123 561234",
            "123456 612345 234561 345612 561234 456123",
            "123456 612345 234561 456123 345612 561234",
            "123456 612345 234561 456123 561234 345612",
            "123456 612345 234561 561234 345612 456123",
            "123456 612345 234561 561234 456123 345612",
            "123456 612345 345612 234561 456123 561234",
            "123456 612345 345612 234561 561234 456123",
            "123456 612345 345612 456123 234561 561234",
            "123456 612345 345612 456123 561234 234561",
            "123456 612345 345612 561234 234561 456123",
            "123456 612345 345612 561234 456123 234561",
            "123456 612345 456123 234561 345612 561234",
            "123456 612345 456123 234561 561234 345612",
            "123456 612345 456123 345612 234561 561234",
            "123456 612345 456123 345612 561234 234561",
            "123456 612345 456123 561234 234561 345612",
            "123456 612345 456123 561234 345612 234561",
            "123456 612345 561234 234561 345612 456123",
            "123456 612345 561234 234561 456123 345612",
            "123456 612345 561234 345612 234561 456123",
            "123456 612345 561234 345612 456123 234561",
            "123456 612345 561234 456123 234561 345612",
            "123456 612345 561234 456123 345612 234561",
        ]
    }

    var init_board, init_game_gui, init_game, init_board_gui,
        get_board,
        array_nd, array_choose, array_choose_n, get_block_xy,
        check, get_user_inp, check_inp, has_dup, random_level, shuffle, rand_int,
        config = {
            board_size: 3,
            colors: null,
            level: 3,
            enable_block: false,
            game_end: false
        },
        stat = {
            color: null
        };

    init_game = function () {
        config.level = random_level(config.board_size);
        config.colors = array_choose_n(COLORS, config.board_size);
        config.enable_block = config.board_size === 9;
        config.game_end = false;
        var game_board = get_board(config.board_size, config.enable_block);
        game_board = init_board(game_board, config.level);
        init_board_gui(config.board_size, game_board, config.colors);
        init_game_gui(config.colors);
    }

    init_board = function (board, num_hole) {
        var lst = [];
        for (var i = 0; i < config.board_size; i++) {
            for (var j = 0; j < config.board_size; j++) {
                lst.push([i, j]);
            }
        }
        var data = array_choose_n(lst, num_hole);
        for (var idx = 0; idx < num_hole; idx++) {
            var i = data[idx][0];
            var j = data[idx][1];
            board[i][j] = 0;
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
            min = Math.ceil(size * 0.4),
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

    rand_int = function(max) {
        return Math.floor(Math.random() * max);
    }

    array_choose = function (array) {
        return array[rand_int(array.length)];
    }

    array_choose_n = function (array, n) {
        return shuffle(array).slice(0, n)
    }

    shuffle = function (array) {
        var last = array.length;
        while (last > 0) {
            --last;
            var n = rand_int(last);
            var q = array[n];
            array[n] = array[last];
            array[last] = q;
        }
        return array;
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
            config.game_end = true;
        } else {
            msg_box.innerHTML = "";
        }
    }

    get_block_xy = function (i, j, block_size) {
        var x = (Math.floor(i / block_size) * block_size) + Math.floor(j / block_size);
        var y = ((i % block_size) * block_size) + (j % block_size);
        return [x, y];
    }

    get_board = function (size, use_block) {
        var data = array_choose(BOARDS[size]).split(" ");
        var board = [];
        for (var i = 0; i < data.length; i++) {
            var row_str = data[i];
            var sub_lst = [];
            for (var j = 0; j < row_str.length; j++) {
                sub_lst.push(parseInt(row_str[j]));
            }
            board.push(sub_lst);
        }
        return board;
    }

    init_board_gui = function (size, game_board, colors) {
        var boardW = document.getElementsByClassName("game-board")[0].offsetWidth;
        var board = document.createElement("table");
        board.id = "board";
        board.style.width = boardW + "px";
        board.style.height = boardW + "px";
        var boardBody = document.createElement("tbody");
        board.append(boardBody);

        var boxSize = Math.floor(boardW / size) - 4;
        var box = document.createElement("td");
        box.classList.add("board-box", "ear");
        box.style.width = boxSize + "px";
        box.style.height = boxSize + "px";
        var boardTrTemp = document.createElement("tr");

        if (size === 5) {
            box.classList.add("board-box-sm");
        } else if (size === 6) {
            box.classList.add("board-box-xs");
        }

        var box_on_click = function () {
            var box = this,
                color = stat.color;
            if (config.game_end) return;

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

                    var icon = document.createElement("div");
                    icon.classList.add("board-box-fixed-icon");
                    ele.appendChild(icon);

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
        var box1 = document.getElementById("btn-color-box-1");
        var box2 = document.getElementById("btn-color-box-2");
        var btn_color_temp = document.createElement("div");
        btn_color_temp.classList.add("btn-color");
        var class_select = "btn-color-select";
        box1.innerHTML = "";
        box2.innerHTML = "";
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

            if ((config.board_size === 5 && idx > 2) || (config.board_size === 6 && idx > 3)) {
                box2.append(ele);
            } else {
                box1.append(ele);
            }
        }

        document.getElementById("btn-new").addEventListener("click", function () {
            init_game();
        })

        var level_btns = document.getElementsByClassName("level");
        var on_click_level_btn = function () {
            document.querySelector(".level.level-selected").classList.remove("level-selected");
            this.classList.add("level-selected");
            config.board_size = parseInt(this.getAttribute("data-size"));
            init_game();
        }
        for (var idx = 0; idx < level_btns.length; idx++) {
            level_btns[idx].addEventListener("click", on_click_level_btn);
        }
    }

    return {
        init: init_game
    }
})();

var tid = setInterval( function () {
    if (document.readyState !== "complete") return;
    clearInterval(tid);
    colorSudoku.init();
}, 100 );
