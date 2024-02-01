(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [405],
  {
    8312: function (e, t, o) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return o(4861);
        },
      ]);
    },
    4861: function (e, t, o) {
      "use strict";
      o.r(t),
        o.d(t, {
          default: function () {
            return p;
          },
        });
      var s = o(5893),
        n = o(7294);
      class r {
        get length() {
          return this._bodyCoordinates.length;
        }
        get bodyCoordinates() {
          if (0 === this._bodyCoordinates.length) {
            let e = { row: 1, col: 1 };
            for (let t = 1; t <= this.defaultlength; t++)
              this._bodyCoordinates.push({ row: e.row, col: e.col * t });
          }
          return this._bodyCoordinates;
        }
        set bodyCoordinates(e) {
          this._bodyCoordinates = e;
        }
        get headCoordinate() {
          return (
            (this._headCoordinate.row < 0 || this._headCoordinate.col < 0) &&
              (this._headCoordinate = this.bodyCoordinates[this.length - 1]),
            this._headCoordinate
          );
        }
        set headCoordinate(e) {
          this._headCoordinate = e;
        }
        changeMovement(e) {
          if (!this.allowMovementChange) return;
          let t =
              ("to bottom" === e && "to top" === this.movement) ||
              ("to top" === e && "to bottom" === this.movement),
            o =
              ("to right" === e && "to left" === this.movement) ||
              ("to left" === e && "to right" === this.movement);
          t || o || ((this.movement = e), (this.allowMovementChange = !1));
        }
        canEat(e, t) {
          return e.col === t.col && e.row === t.row;
        }
        move(e) {
          let t = { ...this.headCoordinate };
          switch (this.movement) {
            case "to right":
              t = { ...t, col: this.headCoordinate.col + 1 };
              break;
            case "to left":
              t = { ...t, col: this.headCoordinate.col - 1 };
              break;
            case "to top":
              t = { ...t, row: this.headCoordinate.row - 1 };
              break;
            case "to bottom":
              t = { ...t, row: this.headCoordinate.row + 1 };
              break;
            default:
              throw Error("Snake movement is invalid: ".concat(this.movement));
          }
          if (this.canEat(t, e)) {
            let e = [...this.bodyCoordinates];
            (this.headCoordinate = t),
              e.push(this.headCoordinate),
              (this.bodyCoordinates = e),
              (this.allowMovementChange = !0),
              (this.justAte = !0);
          } else {
            let e = this.bodyCoordinates.slice(1);
            (this.headCoordinate = t),
              e.push(this.headCoordinate),
              (this.bodyCoordinates = e),
              (this.allowMovementChange = !0),
              (this.justAte = !1);
          }
        }
        constructor() {
          (this.movement = "to right"),
            (this._bodyCoordinates = []),
            (this.defaultlength = 3),
            (this._headCoordinate = { row: -1, col: -1 }),
            (this.allowMovementChange = !0),
            (this.justAte = !1);
        }
      }
      class a {
        get score() {
          return 0 === this.snake.length
            ? 0
            : 10 * this.snake.length - 10 * this.snake.defaultlength;
        }
        get gameBoard() {
          if (0 === this._gameBoard.length) {
            let e = this.numOfRowsAndCols,
              t = this.numOfRowsAndCols;
            for (let o = 0; o < e; o++)
              this._gameBoard.push(Array.from(Array(t)).fill(null));
          }
          return this._gameBoard;
        }
        set gameBoard(e) {
          this._gameBoard = e;
        }
        get foodCoordinate() {
          let e = (e, t) =>
            void 0 !==
            this.snake.bodyCoordinates.find((o) => o.col === t && o.row === e);
          if (this._foodCoordinate.row < 0 || this._foodCoordinate.col < 0) {
            let t = Math.floor(Math.random() * this.numOfRowsAndCols),
              o = Math.floor(Math.random() * this.numOfRowsAndCols);
            for (; e(t, o); )
              (t = Math.floor(Math.random() * this.numOfRowsAndCols)),
                (o = Math.floor(Math.random() * this.numOfRowsAndCols));
            this._foodCoordinate = { row: t, col: o };
          }
          return this._foodCoordinate;
        }
        set foodCoordinate(e) {
          let t = (e, t) =>
            void 0 !==
            this.snake.bodyCoordinates.find((o) => o.col === t && o.row === e);
          if (e.row < 0 || e.col < 0) {
            let e = Math.floor(Math.random() * this.numOfRowsAndCols),
              o = Math.floor(Math.random() * this.numOfRowsAndCols);
            for (; t(e, o); )
              (e = Math.floor(Math.random() * this.numOfRowsAndCols)),
                (o = Math.floor(Math.random() * this.numOfRowsAndCols));
            this._foodCoordinate = { row: e, col: o };
          } else this._foodCoordinate = e;
        }
        generateGrid() {
          let e = this.boardSidesLength / this.numOfRowsAndCols,
            t = this.boardSidesLength / this.numOfRowsAndCols;
          this.gameBoard.forEach((o, s) => {
            o.forEach((o, n) => {
              switch (o) {
                case "snake":
                  this.context.fillStyle = "black";
                  break;
                case "food":
                  this.context.fillStyle = "#A2C579";
                  break;
                case null:
                  this.context.fillStyle = "white";
              }
              this.context.fillRect(n * e, s * t, e, t);
            });
          });
        }
        setFoodOnBoard() {
          this.snake.justAte && (this.foodCoordinate = { row: -1, col: -1 }),
            (this.gameBoard[this.foodCoordinate.row][this.foodCoordinate.col] =
              "food");
        }
        setSnakeOnBoard() {
          let e = this.gameBoard.map((e) => e.fill(null));
          this.snake.bodyCoordinates.forEach((t) => {
            e[t.row][t.col] = "snake";
          }),
            (this.gameBoard = e);
        }
        renderBoard() {
          this.setSnakeOnBoard(), this.setFoodOnBoard(), this.generateGrid();
        }
        snakeIsOutOfBounds() {
          let e = this.snake.headCoordinate,
            t = { min: 0, max: this.numOfRowsAndCols - 1 },
            o = e.row > t.max || e.row < t.min,
            s = e.col > t.max || e.col < t.min;
          return o || s;
        }
        snakeHitsBody() {
          let e = this.snake.bodyCoordinates.slice(0, this.snake.length - 1),
            t = this.snake.headCoordinate;
          return (
            void 0 !==
            e.find((e) => {
              let o = e.row === t.row,
                s = e.col === t.col;
              return o && s;
            })
          );
        }
        isGameOver() {
          return this.snakeHitsBody() || this.snakeIsOutOfBounds();
        }
        animate(e) {
          if (
            ((this.internalPlayState = e),
            this.currentFrameCount < this.staggerFrame)
          )
            this.currentFrameCount++;
          else {
            if (
              ((this.currentFrameCount = 0),
              this.externalScore !== this.score && this.setScore(this.score),
              this.isGameOver())
            ) {
              this.setIsGameOver(!0);
              return;
            }
            this.context.clearRect(
              0,
              0,
              this.boardSidesLength,
              this.boardSidesLength
            ),
              this.renderBoard(),
              this.snake.move(this.foodCoordinate);
          }
          this.internalPlayState &&
            requestAnimationFrame(() => this.animate(this.internalPlayState));
        }
        constructor(e, t, o, s, n, a) {
          (this.context = e),
            (this.snake = new r()),
            (this._foodCoordinate = { row: -1, col: -1 }),
            (this.boardSidesLength = t),
            (this.numOfRowsAndCols = 26),
            (this._gameBoard = []),
            (this.externalScore = o),
            (this.setScore = s),
            (this.setIsGameOver = n),
            (this.currentFrameCount = 0),
            (this.staggerFrame = 8),
            (this.internalPlayState = a);
        }
      }
      var i = function (e) {
          let {
              isPlaying: t,
              setIsPlaying: o,
              externalScore: r,
              setScore: i,
              setIsGameOver: l,
            } = e,
            h = (0, n.useRef)(null),
            c = (0, n.useRef)(null),
            d = (0, n.useRef)(null);
          return (
            (0, n.useEffect)(() => {
              if (null === h.current) throw Error("canvasRef is not used");
              let e = h.current.parentElement,
                s = e ? 0.5 * e.clientWidth : 0.5 * window.innerWidth;
              if (
                ((h.current.width = s),
                (h.current.height = s),
                (c.current = h.current.getContext("2d")),
                c.current)
              ) {
                let e = c.current;
                d.current = new a(e, s, r, i, l, t);
                let n = d.current;
                window.onkeydown = (e) => {
                  switch (e.key) {
                    case "w":
                    case "ArrowUp":
                      n.snake.changeMovement("to top");
                      break;
                    case "s":
                    case "ArrowDown":
                      n.snake.changeMovement("to bottom");
                      break;
                    case "d":
                    case "ArrowRight":
                      n.snake.changeMovement("to right");
                      break;
                    case "a":
                    case "ArrowLeft":
                      n.snake.changeMovement("to left");
                      break;
                    case "Escape":
                      o((e) => !e);
                  }
                };
              }
              return () => {
                (h.current = null), (c.current = null), (d.current = null);
              };
            }, []),
            (0, n.useEffect)(() => {
              d.current && d.current.animate(t);
            }, [t]),
            (0, s.jsx)("div", {
              children: (0, s.jsx)("canvas", { id: "game-canvas", ref: h }),
            })
          );
        },
        l = o(4480);
      let h = (0, l.cn)({ key: "highScoresState", default: [] });
      function c(e) {
        var t;
        let {
          finalScore: o,
          setIsGameOver: r,
          setIsPlaying: a,
          setJustStarted: i,
          setScore: c,
        } = e;
        localStorage.getItem(u);
        let [d, m] = (0, n.useState)(""),
          [f, g] = (0, l.FV)(h),
          w =
            o > ((null === (t = f[2]) || void 0 === t ? void 0 : t.score) || 0),
          [C, x] = (0, n.useState)(!1),
          j = async (e, t) => {
            if (C) return null;
            try {
              x(!0);
              let o = await fetch("/api/submitHighScore", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ username: e, score: t }),
                }),
                s = await o.json();
              console.log(s);
              let n = await fetch("/api/getHighScores"),
                r = await n.json();
              g(r);
            } catch (e) {
              console.error("Error submitting score:", e);
            }
            let o = await fetch("/api/getHighScores");
            g(await o.json());
          };
        return (0, s.jsx)("div", {
          id: "game-over-modal-container",
          children: (0, s.jsxs)("div", {
            id: "game-over-modal",
            children: [
              (0, s.jsx)("h2", {
                className: "game-over",
                children: "Game Over",
              }),
              (0, s.jsxs)("p", {
                className: "final-score",
                children: [
                  "Your Final Score: ",
                  (0, s.jsx)("span", { children: o }),
                ],
              }),
              C &&
                (0, s.jsx)("p", {
                  className: "submitted-message",
                  children: "Score submitted successfully!",
                }),
              w &&
                !C &&
                (0, s.jsxs)(s.Fragment, {
                  children: [
                    (0, s.jsx)("input", {
                      type: "text",
                      className: "textInput",
                      value: d,
                      onChange: (e) => m(e.target.value),
                      placeholder: "Enter your username",
                    }),
                    (0, s.jsx)("button", {
                      onClick: () => j(d, o),
                      children: "Submit Score",
                    }),
                  ],
                }),
              (0, s.jsx)("p", {
                className: "click-dir",
                onClick: () => {
                  r(!1), a(!0), x(!1), i(!0), c(0);
                },
                children: "(Click here to continue)",
              }),
            ],
          }),
        });
      }
      function d(e) {
        let { setIsPlaying: t } = e;
        return (0, s.jsx)("div", {
          id: "paused-modal-container",
          onClick: () => t((e) => !e),
          children: (0, s.jsxs)("div", {
            id: "paused-modal",
            children: [
              (0, s.jsx)("h2", { children: "Paused" }),
              (0, s.jsx)("p", {
                className: "click-dir",
                children: "(Click anywhere to continue)",
              }),
            ],
          }),
        });
      }
      let u = "high-score";
      function m() {
        let [e, t] = (0, l.FV)(h),
          o = e.length > 0 ? e[0].score : 0,
          [r, a] = (0, n.useState)(0),
          [u, m] = (0, n.useState)(!1),
          [f, g] = (0, n.useState)(!1),
          [w, C] = (0, n.useState)(!0);
        return (0, s.jsxs)("div", {
          id: "snakes-game-container",
          onClick: () => {
            if (w) {
              g(!0), C(!1), a(0);
              return;
            }
            u || g(!f);
          },
          children: [
            (0, s.jsxs)("p", {
              className: "high-score",
              children: ["High Score: ", o],
            }),
            w
              ? (0, s.jsx)("p", {
                  className: "new-game-hint",
                  children: "Click anywhere to start",
                })
              : (0, s.jsx)(s.Fragment, {}),
            !u &&
              !w &&
              (0, s.jsx)(i, {
                isPlaying: f,
                setIsPlaying: g,
                externalScore: r,
                setScore: a,
                setIsGameOver: m,
              }),
            u &&
              (0, s.jsx)(c, {
                setIsGameOver: m,
                setIsPlaying: g,
                finalScore: r,
                setJustStarted: C,
                setScore: a,
              }),
            w ? "" : !u && !f && (0, s.jsx)(d, { setIsPlaying: g }),
          ],
        });
      }
      var f = o(9833),
        g = o(2091),
        w = o(1664),
        C = o.n(w),
        x = o(8633),
        j = o(6204),
        k = o(5282),
        b = o(6454),
        p = () => {
          let [e, t] = (0, l.FV)(h);
          (0, n.useEffect)(() => {
            fetch("/api/getHighScores")
              .then((e) => e.json())
              .then((e) => {
                console.log(e), t(e);
              })
              .catch((e) => {
                console.error("Error fetching high scores:", e);
              });
          }, []);
          let o = [
              "NOKIA Coin Roadmap 2024:",
              "Q1: Launch and Community Building",
              "Official release of NOKIA Coin.",
              "Establish online community platforms for discussions and feedback.",
              "Q2: Partnership Development",
              "initiate collaborations with e-commerce platforms.",
              "Q3: User Engagement and Rewards",
              "Host an online contest or hackathon with rewards in NOKIA Coin.",
              "Introduce a loyalty program for early adopters.",
              "Q4: Evaluation and Expansion",
              "Assess progress and gather community feedback.",
              "Outline plans for the following year focusing on expansion and innovation.",
            ],
            [r, a] = (0, n.useState)([]),
            [i, c] = (0, n.useState)(0),
            [d, u] = (0, n.useState)(0),
            [w, p] = (0, n.useState)(!1),
            v = (0, n.useRef)(null),
            y = (0, n.useRef)(null),
            [S, O] = (0, n.useState)(!1),
            [A, _] = (0, n.useState)(!1),
            [N, B] = (0, n.useState)(!1),
            E = (0, n.useRef)(null),
            [R, M] = (0, n.useState)(!1);
          (0, n.useEffect)(() => {
            let e = E.current;
            e && ((e.loop = !0), e.play());
          }, []);
          let F = (e) => {
            let t = new KeyboardEvent("keydown", {
              key: e,
              code: e,
              keyCode:
                "ArrowUp" === e
                  ? 38
                  : "ArrowDown" === e
                  ? 40
                  : "ArrowLeft" === e
                  ? 37
                  : "ArrowRight" === e
                  ? 39
                  : 0,
              bubbles: !0,
            });
            window.dispatchEvent(t);
          };
          return (
            (0, n.useEffect)(() => {
              i < o.length &&
                d <= o[i].length &&
                setTimeout(() => {
                  a((e) => {
                    let t = [...e];
                    return (t[i] = o[i].slice(0, d)), t;
                  }),
                    !N &&
                      v.current &&
                      (v.current.scrollTop = v.current.scrollHeight),
                    d < o[i].length ? u(d + 1) : (c(i + 1), u(0));
                }, 30),
                i !== o.length ||
                  w ||
                  (p(!0),
                  setTimeout(() => {
                    y.current &&
                      y.current.scrollIntoView({ behavior: "smooth" });
                  }, 1e3));
            }, [i, d, o, w, N]),
            (0, s.jsxs)("div", {
              className: "body",
              children: [
                (0, s.jsx)("audio", { ref: E, src: "music.mp3" }),
                (0, s.jsx)("div", {
                  className: "logo",
                  children: (0, s.jsx)(C(), {
                    href: "/",
                    children: (0, s.jsx)("img", { src: "logo.png" }),
                  }),
                }),
                (0, s.jsxs)("div", {
                  className: "links",
                  children: [
                    (0, s.jsx)("button", {
                      className: "play-pause-button",
                      onClick: () => {
                        M(!R),
                          E.current &&
                            (R ? E.current.pause() : E.current.play());
                      },
                      children: R
                        ? (0, s.jsx)(k.ZZy, {})
                        : (0, s.jsx)(b.YcT, {}),
                    }),
                    (0, s.jsx)("a", {
                      href: "chartlink",
                      target: "blank",
                      children: (0, s.jsx)("img", { src: "./birdeye.png" }),
                    }),
                    (0, s.jsx)("a", {
                      href: "https://twitter.com/nokia_solanaa",
                      target: "blank",
                      children: (0, s.jsx)(j.LCd, {}),
                    }),
                    (0, s.jsx)("a", {
                      href: "https://t.me/nokiasolana",
                      target: "blank",
                      children: (0, s.jsx)(k.Cyx, {}),
                    }),
                  ],
                }),
                S
                  ? (0, s.jsx)(m, {})
                  : (0, s.jsx)("div", {
                      className: "Description",
                      onClick: () => B(!0),
                      ref: v,
                      children: A
                        ? (0, s.jsxs)("div", {
                            className: "high-scores-section",
                            children: [
                              (0, s.jsx)("h2", { children: "High Scores" }),
                              (0, s.jsx)("ul", {
                                children: e.map((e, t) =>
                                  (0, s.jsxs)(
                                    "li",
                                    { children: [e.username, ": ", e.score] },
                                    t
                                  )
                                ),
                              }),
                            ],
                          })
                        : r.map((e, t) => {
                            let o = e.split(":");
                            return (0, s.jsx)(s.Fragment, {
                              children: (0, s.jsx)(
                                "p",
                                {
                                  children:
                                    o.length > 1
                                      ? (0, s.jsxs)(s.Fragment, {
                                          children: [
                                            (0, s.jsx)("span", {
                                              className: "special-effect",
                                              children: o[0],
                                            }),
                                            ": ",
                                            o[1],
                                          ],
                                        })
                                      : e,
                                },
                                t
                              ),
                            });
                          }),
                    }),
                (0, s.jsx)("button", {
                  className: "SnakeOn",
                  onClick: () => {
                    _(!1), O(!S);
                  },
                  children: (0, s.jsx)(f.EPV, {}),
                }),
                (0, s.jsx)("button", {
                  className: "highscoreOn",
                  onClick: () => {
                    _(!A), O(!1);
                  },
                  children: (0, s.jsx)(x.edd, {}),
                }),
                S
                  ? (0, s.jsxs)("div", {
                      className: "mobile-controls",
                      children: [
                        (0, s.jsx)("button", {
                          className: "mobileButton",
                          onClick: () => F("ArrowLeft"),
                          children: (0, s.jsx)(g.x_l, {}),
                        }),
                        (0, s.jsxs)("div", {
                          className: "center-buttons",
                          children: [
                            (0, s.jsx)("button", {
                              className: "mobileButton",
                              onClick: () => F("ArrowUp"),
                              children: (0, s.jsx)(g.ZTc, {}),
                            }),
                            (0, s.jsx)("button", {
                              className: "mobileButton",
                              onClick: () => F("ArrowDown"),
                              children: (0, s.jsx)(g.NWQ, {}),
                            }),
                          ],
                        }),
                        (0, s.jsx)("button", {
                          className: "mobileButton",
                          onClick: () => F("ArrowRight"),
                          children: (0, s.jsx)(g.Z1Y, {}),
                        }),
                      ],
                    })
                  : null,
              ],
            })
          );
        };
    },
  },
  function (e) {
    e.O(0, [909, 970, 396, 365, 219, 738, 913, 774, 888, 179], function () {
      return e((e.s = 8312));
    }),
      (_N_E = e.O());
  },
]);
