function Rps() {
    var game;
    let _this = this;

    let hand = ["rock", "paper", "scissor"];

    var path;
    let hb = document.querySelectorAll(".humansl");
    let tgm = document.querySelectorAll(".actgame");

    hb.forEach(function(btnh) {
        btnh.addEventListener("click",function(event) {
            event.preventDefault();
            let slhuman = btnh.getAttribute("data-type");

            if (slhuman === 'slrndm') {
                const scm = Math.floor(Math.random() * 3);
                slhuman = hand[scm];
            }

            const bs = document.getElementById("imgplay");
            bs.textContent = "";

            const hm = document.createElement("img");
            hm.className = "timg";
            hm.setAttribute("src", path + "assets/img/" + slhuman + "_sx.png");

            bs.appendChild(hm);

            hb.forEach(function(elm) {
                elm.setAttribute("disabled","disabled");
            });

            _this.playGame(slhuman);
        });
    });

    tgm.forEach(function(btng) {
        btng.addEventListener("click",function(event) {
            event.preventDefault();
            game = btng.getAttribute("data-type");

            tgm.forEach(function(elm) {
                elm.setAttribute("disabled","disabled");
            });

            if (game === 'ones') {
                document.getElementById("hmnbutton").setAttribute("style", "display: block;");
            } else if (game === 'cnts') {
                _this.playGame();
            }
        });
    });

    this.contestGame = function() {
        let trnm = 5;
        let cnl = [];
        let hpoint = 0;
        let mpoint = 0;

        for (let s = 0; s < trnm; s++) {
            const h = Math.floor(Math.random() * 3);
            const sh = hand[h];
            const m = Math.floor(Math.random() * 3);
            let sm = hand[m];
            let res = '';

            if (sh !== sm) {
                if ((sh == "rock" && sm == "scissor") 
                    || (sh == "paper" && sm == "rock") 
                    || (sh == "scissor" && sm == "paper")) {
                    hpoint++;

                    res = "Human Win!";
                } else {
                    mpoint++;

                    res = "Computer Win!";
                }
            } else {
                res = "Tie!";
            }

            const datacn = {
                human: sh,
                machina: sm,
                result: res
            };

            cnl.push(datacn);
        }

        const pnh = document.getElementById("cntHuman");
        pnh.textContent = hpoint;

        const pnm = document.getElementById("cntMachine");
        pnm.textContent = mpoint;

        const rs = document.getElementById("result");
        const div = document.createElement("div");
        div.setAttribute("style","margin-top: 10px;");

        if (parseInt(hpoint) > parseInt(mpoint)) {
            div.append("Human WIN!");
        } else if (parseInt(hpoint) < parseInt(mpoint)) {
            div.append("Computer WIN!");
        } else {
            div.append("Human and Computer tied!");
        }

        const rpr = document.createElement("div");
        rpr.id = "report";

        const tbr = document.createElement("table");
        tbr.setAttribute("cellpadding", 3);
        tbr.setAttribute("cellspacing", 0);
        tbr.id = "tbrep";

        const tsh = document.createElement("thead");
        const thr = document.createElement("tr");
        const thh = document.createElement("th");
        thh.textContent = "Human";
        thh.className = "acm";

        thr.appendChild(thh);

        const thm = document.createElement("th");
        thm.textContent = "Computer";
        thm.className = "acm";

        thr.appendChild(thm);

        const thl = document.createElement("th");
        thl.textContent = "Result";
        thl.className = "lsm";

        thr.appendChild(thl);
        tsh.appendChild(thr);
        tbr.appendChild(tsh);

        const tsb = document.createElement("tbody");

        cnl.forEach(function(c) {
            const tr = document.createElement("tr");
            const tdh = document.createElement("td");
            const tdm = document.createElement("td");
            const tdr = document.createElement("td");

            const h = document.createElement("img");
            h.className = "tcnt";
            h.setAttribute("src", path + "assets/img/" + c.human + "_sx.png");

            tdh.appendChild(h);

            const m = document.createElement("img");
            m.className = "tcnt";
            m.setAttribute("src", path + "assets/img/" + c.machina + "_dx.png");

            tdm.appendChild(m);

            tdr.textContent = c.result;

            tr.appendChild(tdh);
            tr.appendChild(tdm);
            tr.appendChild(tdr);

            tsb.appendChild(tr);
        });

        tbr.appendChild(tsb);
        rpr.appendChild(tbr);
        rs.prepend(rpr, div);

        const btng = document.createElement("input");
        btng.setAttribute("type", "button");
        btng.setAttribute("style", "margin-top: 7px;");
        btng.value = "New Game";

        rs.appendChild(btng);

        btng.addEventListener("click",function(event) {
            event.preventDefault();

            _this.init();
        });
    }

    this.simpleGame = function(args) {
        if (typeof args !== '' && typeof args !== 'undefined') {
            let timeleft = 3;
            let gameTimer = setInterval(function() {
                const basevs = document.getElementById("tvs");
                basevs.textContent = "";

                if (timeleft <= 0) {
                    clearInterval(gameTimer);

                    const scm = Math.floor(Math.random() * 3);
                    let act = hand[scm];

                    let resg = "";
                    if (act == args) {
                        resg = "Tie!";
                    } else {
                        if ((args == "rock" && act == "scissor") 
                            || (args == "paper" && act == "rock") 
                            || (args == "scissor" && act == "paper")) {
                            resg = "Human WIN!";
                        } else {
                            resg = "Computer WIN! You LOSE!";
                        }
                    }

                    const vs = document.createElement("img");
                    vs.className = "tcnt";
                    vs.setAttribute("src", path + "assets/img/vs1.png");

                    basevs.textContent = "-";

                    const bc = document.getElementById("imgnpc");
                    bc.textContent = "";

                    const mcn = document.createElement("img");
                    mcn.className = "timg";
                    mcn.setAttribute("src", path + "assets/img/" + act + "_dx.png");

                    bc.appendChild(mcn);

                    const r = document.getElementById("result");
                    r.textContent = resg;

                    const nl = document.createElement("br");
                    r.appendChild(nl);

                    const btng = document.createElement("input");
                    btng.setAttribute("type", "button");
                    btng.setAttribute("style", "margin-top: 5px;");
                    btng.value = "New Game";

                    r.appendChild(btng);

                    btng.addEventListener("click",function(event) {
                        event.preventDefault();

                        _this.init();
                    });
                } else {
                    basevs.textContent = timeleft;
                }
                
                timeleft -= 1;
            }, 1000);
        }
    }

    this.playGame = function(args) {
        if (typeof game !== 'undefined') {
            if (game === 'ones') {
                if (typeof args !== '' && typeof args !== 'undefined') {
                    _this.simpleGame(args);
                }
            }

            if (game === 'cnts') {
                _this.contestGame();
            }
        }
    }

    this.init = function() {
        let base = location.href;
        path = base.substring(0, base.lastIndexOf('/')) + "/";

        const boxh = document.getElementById("cntHuman");
        boxh.textContent = "";

        let cnths = document.createElement("div");
        cnths.id = "imgplay";

        boxh.appendChild(cnths);

        const boxt = document.getElementById("tvs");
        boxt.textContent = "";

        let cnttmr = document.createElement("img");
        cnttmr.className = "tcnt";
        cnttmr.setAttribute("src", path + "assets/img/wait.png");

        boxt.appendChild(cnttmr);

        const boxm = document.getElementById("cntMachine");
        boxm.textContent = "";

        let cntmcn = document.createElement("div");
        cntmcn.id = "imgnpc";

        boxm.appendChild(cntmcn);

        const v = document.getElementById("vrs");
        v.textContent = "";

        const vs = document.createElement("img");
        vs.className = "tcnt";
        vs.setAttribute("src", path + "assets/img/vs1.png");

        v.appendChild(vs);

        hb.forEach(function(elm) {
            elm.removeAttribute("disabled");
        });

        tgm.forEach(function(btng) {
            btng.removeAttribute("disabled");
        });

        document.getElementById("hmnbutton").removeAttribute("style");
        document.getElementById("result").textContent = "";

        game = void 0;
    }

    this.init();
}

let g = new Rps();
