var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expect = std.testing.expect;"},
{"lineNum":"   20","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   21","line":"const TokenType = @import(\"../common/token.zig\").Token.Type;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"const Branch = struct {"},
{"lineNum":"   24","line":"    branch: u8,"},
{"lineNum":"   25","line":"    lexer: OperatorLexer,"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"    pub fn new(branch: u8, lexer: OperatorLexer) Branch {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"        return Branch{","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"            .branch = branch,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"            .lexer = lexer,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"        };"},
{"lineNum":"   32","line":"    }"},
{"lineNum":"   33","line":"};"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"const OperatorLexer = struct {"},
{"lineNum":"   36","line":"    terminal: ?TokenType,"},
{"lineNum":"   37","line":"    branches: []const Branch,"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub const Result = struct {"},
{"lineNum":"   40","line":"        ty: TokenType,"},
{"lineNum":"   41","line":"        len: u32,"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"        pub fn new(ty: TokenType, len: u32) Result {","class":"lineCov","hits":"1","order":"2726","possible_hits":"1",},
{"lineNum":"   44","line":"            return Result{","class":"lineCov","hits":"1","order":"2729","possible_hits":"1",},
{"lineNum":"   45","line":"                .ty = ty,","class":"lineCov","hits":"1","order":"2727","possible_hits":"1",},
{"lineNum":"   46","line":"                .len = len,","class":"lineCov","hits":"1","order":"2728","possible_hits":"1",},
{"lineNum":"   47","line":"            };"},
{"lineNum":"   48","line":"        }"},
{"lineNum":"   49","line":"    };"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    pub fn new(terminal: ?TokenType, branches: []const Branch) OperatorLexer {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"        return OperatorLexer{","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"            .terminal = terminal,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"            .branches = branches,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"        };"},
{"lineNum":"   56","line":"    }"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    pub fn lex(self: OperatorLexer, code: []const u8, depth: u32) ?Result {","class":"lineCov","hits":"1","order":"2716","possible_hits":"1",},
{"lineNum":"   59","line":"        if (code.len < 1)","class":"lineCov","hits":"2","order":"2717","possible_hits":"2",},
{"lineNum":"   60","line":"            return null;","class":"lineCov","hits":"1","order":"2723","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"        for (self.branches) |branch|","class":"lineCov","hits":"2","order":"2718","possible_hits":"2",},
{"lineNum":"   63","line":"            if (branch.branch == code[0])","class":"linePartCov","hits":"2","order":"2719","possible_hits":"3",},
{"lineNum":"   64","line":"                return branch.lexer.lex(","class":"lineCov","hits":"3","order":"2720","possible_hits":"3",},
{"lineNum":"   65","line":"                    code[1..],","class":"linePartCov","hits":"1","order":"2721","possible_hits":"2",},
{"lineNum":"   66","line":"                    depth + 1,","class":"lineCov","hits":"1","order":"2722","possible_hits":"1",},
{"lineNum":"   67","line":"                ) orelse if (branch.lexer.terminal) |terminal|","class":"lineCov","hits":"4","order":"2724","possible_hits":"4",},
{"lineNum":"   68","line":"                    Result.new(terminal, depth + 1)","class":"linePartCov","hits":"1","order":"2725","possible_hits":"2",},
{"lineNum":"   69","line":"                else"},
{"lineNum":"   70","line":"                    null;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"        return if (self.terminal) |terminal|","class":"lineCov","hits":"3","order":"2743","possible_hits":"3",},
{"lineNum":"   73","line":"            Result.new(terminal, depth)","class":"lineCov","hits":"1","order":"2818","possible_hits":"1",},
{"lineNum":"   74","line":"        else"},
{"lineNum":"   75","line":"            null;","class":"lineCov","hits":"1","order":"2744","possible_hits":"1",},
{"lineNum":"   76","line":"    }"},
{"lineNum":"   77","line":"};"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"const operatorLexer = OperatorLexer.new("},
{"lineNum":"   80","line":"    null,"},
{"lineNum":"   81","line":"    &[_]Branch{"},
{"lineNum":"   82","line":"        Branch.new(\'.\', OperatorLexer.new("},
{"lineNum":"   83","line":"            TokenType.Dot,"},
{"lineNum":"   84","line":"            &[_]Branch{"},
{"lineNum":"   85","line":"                Branch.new(\'?\', OperatorLexer.new("},
{"lineNum":"   86","line":"                    TokenType.OptionChain,"},
{"lineNum":"   87","line":"                    &[_]Branch{},"},
{"lineNum":"   88","line":"                )),"},
{"lineNum":"   89","line":"                Branch.new(\'.\', OperatorLexer.new("},
{"lineNum":"   90","line":"                    null,"},
{"lineNum":"   91","line":"                    &[_]Branch{"},
{"lineNum":"   92","line":"                        Branch.new(\'.\', OperatorLexer.new("},
{"lineNum":"   93","line":"                            TokenType.Ellipsis,"},
{"lineNum":"   94","line":"                            &[_]Branch{},"},
{"lineNum":"   95","line":"                        )),"},
{"lineNum":"   96","line":"                    },"},
{"lineNum":"   97","line":"                )),"},
{"lineNum":"   98","line":"            },"},
{"lineNum":"   99","line":"        )),"},
{"lineNum":"  100","line":"        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  101","line":"            TokenType.Assign,"},
{"lineNum":"  102","line":"            &[_]Branch{"},
{"lineNum":"  103","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  104","line":"                    TokenType.CmpEq,"},
{"lineNum":"  105","line":"                    &[_]Branch{"},
{"lineNum":"  106","line":"                        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  107","line":"                            TokenType.CmpStrictEq,"},
{"lineNum":"  108","line":"                            &[_]Branch{},"},
{"lineNum":"  109","line":"                        )),"},
{"lineNum":"  110","line":"                    },"},
{"lineNum":"  111","line":"                )),"},
{"lineNum":"  112","line":"                Branch.new(\'>\', OperatorLexer.new("},
{"lineNum":"  113","line":"                    TokenType.Arrow,"},
{"lineNum":"  114","line":"                    &[_]Branch{},"},
{"lineNum":"  115","line":"                )),"},
{"lineNum":"  116","line":"            },"},
{"lineNum":"  117","line":"        )),"},
{"lineNum":"  118","line":"        Branch.new(\'+\', OperatorLexer.new("},
{"lineNum":"  119","line":"            TokenType.Add,"},
{"lineNum":"  120","line":"            &[_]Branch{"},
{"lineNum":"  121","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  122","line":"                    TokenType.AddAssign,"},
{"lineNum":"  123","line":"                    &[_]Branch{},"},
{"lineNum":"  124","line":"                )),"},
{"lineNum":"  125","line":"                Branch.new(\'+\', OperatorLexer.new("},
{"lineNum":"  126","line":"                    TokenType.Inc,"},
{"lineNum":"  127","line":"                    &[_]Branch{},"},
{"lineNum":"  128","line":"                )),"},
{"lineNum":"  129","line":"            },"},
{"lineNum":"  130","line":"        )),"},
{"lineNum":"  131","line":"        Branch.new(\'-\', OperatorLexer.new("},
{"lineNum":"  132","line":"            TokenType.Sub,"},
{"lineNum":"  133","line":"            &[_]Branch{"},
{"lineNum":"  134","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  135","line":"                    TokenType.SubAssign,"},
{"lineNum":"  136","line":"                    &[_]Branch{},"},
{"lineNum":"  137","line":"                )),"},
{"lineNum":"  138","line":"                Branch.new(\'-\', OperatorLexer.new("},
{"lineNum":"  139","line":"                    TokenType.Dec,"},
{"lineNum":"  140","line":"                    &[_]Branch{},"},
{"lineNum":"  141","line":"                )),"},
{"lineNum":"  142","line":"            },"},
{"lineNum":"  143","line":"        )),"},
{"lineNum":"  144","line":"        Branch.new(\'*\', OperatorLexer.new("},
{"lineNum":"  145","line":"            TokenType.Mul,"},
{"lineNum":"  146","line":"            &[_]Branch{"},
{"lineNum":"  147","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  148","line":"                    TokenType.MulAssign,"},
{"lineNum":"  149","line":"                    &[_]Branch{},"},
{"lineNum":"  150","line":"                )),"},
{"lineNum":"  151","line":"                Branch.new(\'*\', OperatorLexer.new("},
{"lineNum":"  152","line":"                    TokenType.Pow,"},
{"lineNum":"  153","line":"                    &[_]Branch{"},
{"lineNum":"  154","line":"                        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  155","line":"                            TokenType.PowAssign,"},
{"lineNum":"  156","line":"                            &[_]Branch{},"},
{"lineNum":"  157","line":"                        )),"},
{"lineNum":"  158","line":"                    },"},
{"lineNum":"  159","line":"                )),"},
{"lineNum":"  160","line":"            },"},
{"lineNum":"  161","line":"        )),"},
{"lineNum":"  162","line":"        Branch.new(\'/\', OperatorLexer.new("},
{"lineNum":"  163","line":"            TokenType.Div,"},
{"lineNum":"  164","line":"            &[_]Branch{"},
{"lineNum":"  165","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  166","line":"                    TokenType.DivAssign,"},
{"lineNum":"  167","line":"                    &[_]Branch{},"},
{"lineNum":"  168","line":"                )),"},
{"lineNum":"  169","line":"            },"},
{"lineNum":"  170","line":"        )),"},
{"lineNum":"  171","line":"        Branch.new(\'%\', OperatorLexer.new("},
{"lineNum":"  172","line":"            TokenType.Mod,"},
{"lineNum":"  173","line":"            &[_]Branch{"},
{"lineNum":"  174","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  175","line":"                    TokenType.ModAssign,"},
{"lineNum":"  176","line":"                    &[_]Branch{},"},
{"lineNum":"  177","line":"                )),"},
{"lineNum":"  178","line":"            },"},
{"lineNum":"  179","line":"        )),"},
{"lineNum":"  180","line":"        Branch.new(\'!\', OperatorLexer.new("},
{"lineNum":"  181","line":"            TokenType.LogicalNot,"},
{"lineNum":"  182","line":"            &[_]Branch{"},
{"lineNum":"  183","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  184","line":"                    TokenType.CmpNotEq,"},
{"lineNum":"  185","line":"                    &[_]Branch{"},
{"lineNum":"  186","line":"                        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  187","line":"                            TokenType.CmpStrictNotEq,"},
{"lineNum":"  188","line":"                            &[_]Branch{},"},
{"lineNum":"  189","line":"                        )),"},
{"lineNum":"  190","line":"                    },"},
{"lineNum":"  191","line":"                )),"},
{"lineNum":"  192","line":"            },"},
{"lineNum":"  193","line":"        )),"},
{"lineNum":"  194","line":"        Branch.new(\'>\', OperatorLexer.new("},
{"lineNum":"  195","line":"            TokenType.CmpGreater,"},
{"lineNum":"  196","line":"            &[_]Branch{"},
{"lineNum":"  197","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  198","line":"                    TokenType.CmpGreaterEq,"},
{"lineNum":"  199","line":"                    &[_]Branch{},"},
{"lineNum":"  200","line":"                )),"},
{"lineNum":"  201","line":"                Branch.new(\'>\', OperatorLexer.new("},
{"lineNum":"  202","line":"                    TokenType.ShiftRight,"},
{"lineNum":"  203","line":"                    &[_]Branch{"},
{"lineNum":"  204","line":"                        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  205","line":"                            TokenType.ShiftRightAssign,"},
{"lineNum":"  206","line":"                            &[_]Branch{},"},
{"lineNum":"  207","line":"                        )),"},
{"lineNum":"  208","line":"                        Branch.new(\'>\', OperatorLexer.new("},
{"lineNum":"  209","line":"                            TokenType.ShiftRightUnsigned,"},
{"lineNum":"  210","line":"                            &[_]Branch{"},
{"lineNum":"  211","line":"                                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  212","line":"                                    TokenType.ShiftRightUnsignedAssign,"},
{"lineNum":"  213","line":"                                    &[_]Branch{},"},
{"lineNum":"  214","line":"                                )),"},
{"lineNum":"  215","line":"                            },"},
{"lineNum":"  216","line":"                        )),"},
{"lineNum":"  217","line":"                    },"},
{"lineNum":"  218","line":"                )),"},
{"lineNum":"  219","line":"            },"},
{"lineNum":"  220","line":"        )),"},
{"lineNum":"  221","line":"        Branch.new(\'<\', OperatorLexer.new("},
{"lineNum":"  222","line":"            TokenType.CmpLess,"},
{"lineNum":"  223","line":"            &[_]Branch{"},
{"lineNum":"  224","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  225","line":"                    TokenType.CmpLessEq,"},
{"lineNum":"  226","line":"                    &[_]Branch{},"},
{"lineNum":"  227","line":"                )),"},
{"lineNum":"  228","line":"                Branch.new(\'<\', OperatorLexer.new("},
{"lineNum":"  229","line":"                    TokenType.ShiftLeft,"},
{"lineNum":"  230","line":"                    &[_]Branch{"},
{"lineNum":"  231","line":"                        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  232","line":"                            TokenType.ShiftLeftAssign,"},
{"lineNum":"  233","line":"                            &[_]Branch{},"},
{"lineNum":"  234","line":"                        )),"},
{"lineNum":"  235","line":"                    },"},
{"lineNum":"  236","line":"                )),"},
{"lineNum":"  237","line":"            },"},
{"lineNum":"  238","line":"        )),"},
{"lineNum":"  239","line":"        Branch.new(\'&\', OperatorLexer.new("},
{"lineNum":"  240","line":"            TokenType.BitAnd,"},
{"lineNum":"  241","line":"            &[_]Branch{"},
{"lineNum":"  242","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  243","line":"                    TokenType.BitAndAssign,"},
{"lineNum":"  244","line":"                    &[_]Branch{},"},
{"lineNum":"  245","line":"                )),"},
{"lineNum":"  246","line":"                Branch.new(\'&\', OperatorLexer.new("},
{"lineNum":"  247","line":"                    TokenType.LogicalAnd,"},
{"lineNum":"  248","line":"                    &[_]Branch{"},
{"lineNum":"  249","line":"                        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  250","line":"                            TokenType.LogicalAndAssign,"},
{"lineNum":"  251","line":"                            &[_]Branch{},"},
{"lineNum":"  252","line":"                        )),"},
{"lineNum":"  253","line":"                    },"},
{"lineNum":"  254","line":"                )),"},
{"lineNum":"  255","line":"            },"},
{"lineNum":"  256","line":"        )),"},
{"lineNum":"  257","line":"        Branch.new(\'|\', OperatorLexer.new("},
{"lineNum":"  258","line":"            TokenType.BitOr,"},
{"lineNum":"  259","line":"            &[_]Branch{"},
{"lineNum":"  260","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  261","line":"                    TokenType.BitOrAssign,"},
{"lineNum":"  262","line":"                    &[_]Branch{},"},
{"lineNum":"  263","line":"                )),"},
{"lineNum":"  264","line":"                Branch.new(\'|\', OperatorLexer.new("},
{"lineNum":"  265","line":"                    TokenType.LogicalOr,"},
{"lineNum":"  266","line":"                    &[_]Branch{"},
{"lineNum":"  267","line":"                        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  268","line":"                            TokenType.LogicalOrAssign,"},
{"lineNum":"  269","line":"                            &[_]Branch{},"},
{"lineNum":"  270","line":"                        )),"},
{"lineNum":"  271","line":"                    },"},
{"lineNum":"  272","line":"                )),"},
{"lineNum":"  273","line":"            },"},
{"lineNum":"  274","line":"        )),"},
{"lineNum":"  275","line":"        Branch.new(\'~\', OperatorLexer.new("},
{"lineNum":"  276","line":"            TokenType.BitNot,"},
{"lineNum":"  277","line":"            &[_]Branch{"},
{"lineNum":"  278","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  279","line":"                    TokenType.BitNotAssign,"},
{"lineNum":"  280","line":"                    &[_]Branch{},"},
{"lineNum":"  281","line":"                )),"},
{"lineNum":"  282","line":"            },"},
{"lineNum":"  283","line":"        )),"},
{"lineNum":"  284","line":"        Branch.new(\'^\', OperatorLexer.new("},
{"lineNum":"  285","line":"            TokenType.BitXor,"},
{"lineNum":"  286","line":"            &[_]Branch{"},
{"lineNum":"  287","line":"                Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  288","line":"                    TokenType.BitXorAssign,"},
{"lineNum":"  289","line":"                    &[_]Branch{},"},
{"lineNum":"  290","line":"                )),"},
{"lineNum":"  291","line":"            },"},
{"lineNum":"  292","line":"        )),"},
{"lineNum":"  293","line":"        Branch.new(\'?\', OperatorLexer.new("},
{"lineNum":"  294","line":"            TokenType.Question,"},
{"lineNum":"  295","line":"            &[_]Branch{"},
{"lineNum":"  296","line":"                Branch.new(\'?\', OperatorLexer.new("},
{"lineNum":"  297","line":"                    TokenType.Nullish,"},
{"lineNum":"  298","line":"                    &[_]Branch{"},
{"lineNum":"  299","line":"                        Branch.new(\'=\', OperatorLexer.new("},
{"lineNum":"  300","line":"                            TokenType.NullishAssign,"},
{"lineNum":"  301","line":"                            &[_]Branch{},"},
{"lineNum":"  302","line":"                        )),"},
{"lineNum":"  303","line":"                    },"},
{"lineNum":"  304","line":"                )),"},
{"lineNum":"  305","line":"            },"},
{"lineNum":"  306","line":"        )),"},
{"lineNum":"  307","line":"    },"},
{"lineNum":"  308","line":");"},
{"lineNum":"  309","line":""},
{"lineNum":"  310","line":"pub fn lexOperator(code: []const u8) ?OperatorLexer.Result {","class":"lineCov","hits":"1","order":"2714","possible_hits":"1",},
{"lineNum":"  311","line":"    return operatorLexer.lex(code, 0);","class":"lineCov","hits":"1","order":"2715","possible_hits":"1",},
{"lineNum":"  312","line":"}"},
{"lineNum":"  313","line":""},
{"lineNum":"  314","line":"test \"OperatorLexer returns null at EOF\" {","class":"lineCov","hits":"2","order":"6372","possible_hits":"2",},
{"lineNum":"  315","line":"    const ty = lexOperator(\"\");","class":"lineCov","hits":"1","order":"6373","possible_hits":"1",},
{"lineNum":"  316","line":"    try expect(ty == null);","class":"lineCov","hits":"1","order":"6374","possible_hits":"1",},
{"lineNum":"  317","line":"}"},
{"lineNum":"  318","line":""},
{"lineNum":"  319","line":"test \"OperatorLexer can lex operators\" {","class":"lineCov","hits":"2","order":"6375","possible_hits":"2",},
{"lineNum":"  320","line":"    const TestCase = struct {"},
{"lineNum":"  321","line":"        const This = @This();"},
{"lineNum":"  322","line":""},
{"lineNum":"  323","line":"        str: []const u8,"},
{"lineNum":"  324","line":"        ty: TokenType,"},
{"lineNum":"  325","line":""},
{"lineNum":"  326","line":"        pub fn new(str: []const u8, ty: TokenType) This {","class":"lineCov","hits":"1","order":"6377","possible_hits":"1",},
{"lineNum":"  327","line":"            return This{","class":"lineCov","hits":"1","order":"6380","possible_hits":"1",},
{"lineNum":"  328","line":"                .str = str,","class":"lineCov","hits":"1","order":"6378","possible_hits":"1",},
{"lineNum":"  329","line":"                .ty = ty,","class":"lineCov","hits":"1","order":"6379","possible_hits":"1",},
{"lineNum":"  330","line":"            };"},
{"lineNum":"  331","line":"        }"},
{"lineNum":"  332","line":"    };"},
{"lineNum":"  333","line":""},
{"lineNum":"  334","line":"    for ([_]TestCase{","class":"lineCov","hits":"2","order":"6429","possible_hits":"2",},
{"lineNum":"  335","line":"        TestCase.new(\".\", .Dot),","class":"lineCov","hits":"1","order":"6376","possible_hits":"1",},
{"lineNum":"  336","line":"        TestCase.new(\".?\", .OptionChain),","class":"lineCov","hits":"1","order":"6381","possible_hits":"1",},
{"lineNum":"  337","line":"        TestCase.new(\"...\", .Ellipsis),","class":"lineCov","hits":"1","order":"6382","possible_hits":"1",},
{"lineNum":"  338","line":"        TestCase.new(\"=>\", .Arrow),","class":"lineCov","hits":"1","order":"6383","possible_hits":"1",},
{"lineNum":"  339","line":"        TestCase.new(\"+\", .Add),","class":"lineCov","hits":"1","order":"6384","possible_hits":"1",},
{"lineNum":"  340","line":"        TestCase.new(\"+=\", .AddAssign),","class":"lineCov","hits":"1","order":"6385","possible_hits":"1",},
{"lineNum":"  341","line":"        TestCase.new(\"++\", .Inc),","class":"lineCov","hits":"1","order":"6386","possible_hits":"1",},
{"lineNum":"  342","line":"        TestCase.new(\"-\", .Sub),","class":"lineCov","hits":"1","order":"6387","possible_hits":"1",},
{"lineNum":"  343","line":"        TestCase.new(\"-=\", .SubAssign),","class":"lineCov","hits":"1","order":"6388","possible_hits":"1",},
{"lineNum":"  344","line":"        TestCase.new(\"--\", .Dec),","class":"lineCov","hits":"1","order":"6389","possible_hits":"1",},
{"lineNum":"  345","line":"        TestCase.new(\"*\", .Mul),","class":"lineCov","hits":"1","order":"6390","possible_hits":"1",},
{"lineNum":"  346","line":"        TestCase.new(\"*=\", .MulAssign),","class":"lineCov","hits":"1","order":"6391","possible_hits":"1",},
{"lineNum":"  347","line":"        TestCase.new(\"**\", .Pow),","class":"lineCov","hits":"1","order":"6392","possible_hits":"1",},
{"lineNum":"  348","line":"        TestCase.new(\"**=\", .PowAssign),","class":"lineCov","hits":"1","order":"6393","possible_hits":"1",},
{"lineNum":"  349","line":"        TestCase.new(\"/\", .Div),","class":"lineCov","hits":"1","order":"6394","possible_hits":"1",},
{"lineNum":"  350","line":"        TestCase.new(\"/=\", .DivAssign),","class":"lineCov","hits":"1","order":"6395","possible_hits":"1",},
{"lineNum":"  351","line":"        TestCase.new(\"%\", .Mod),","class":"lineCov","hits":"1","order":"6396","possible_hits":"1",},
{"lineNum":"  352","line":"        TestCase.new(\"%=\", .ModAssign),","class":"lineCov","hits":"1","order":"6397","possible_hits":"1",},
{"lineNum":"  353","line":"        TestCase.new(\"=\", .Assign),","class":"lineCov","hits":"1","order":"6398","possible_hits":"1",},
{"lineNum":"  354","line":"        TestCase.new(\"==\", .CmpEq),","class":"lineCov","hits":"1","order":"6399","possible_hits":"1",},
{"lineNum":"  355","line":"        TestCase.new(\"===\", .CmpStrictEq),","class":"lineCov","hits":"1","order":"6400","possible_hits":"1",},
{"lineNum":"  356","line":"        TestCase.new(\"!\", .LogicalNot),","class":"lineCov","hits":"1","order":"6401","possible_hits":"1",},
{"lineNum":"  357","line":"        TestCase.new(\"!=\", .CmpNotEq),","class":"lineCov","hits":"1","order":"6402","possible_hits":"1",},
{"lineNum":"  358","line":"        TestCase.new(\"!==\", .CmpStrictNotEq),","class":"lineCov","hits":"1","order":"6403","possible_hits":"1",},
{"lineNum":"  359","line":"        TestCase.new(\">\", .CmpGreater),","class":"lineCov","hits":"1","order":"6404","possible_hits":"1",},
{"lineNum":"  360","line":"        TestCase.new(\">=\", .CmpGreaterEq),","class":"lineCov","hits":"1","order":"6405","possible_hits":"1",},
{"lineNum":"  361","line":"        TestCase.new(\"<\", .CmpLess),","class":"lineCov","hits":"1","order":"6406","possible_hits":"1",},
{"lineNum":"  362","line":"        TestCase.new(\"<=\", .CmpLessEq),","class":"lineCov","hits":"1","order":"6407","possible_hits":"1",},
{"lineNum":"  363","line":"        TestCase.new(\"?\", .Question),","class":"lineCov","hits":"1","order":"6408","possible_hits":"1",},
{"lineNum":"  364","line":"        TestCase.new(\"??\", .Nullish),","class":"lineCov","hits":"1","order":"6409","possible_hits":"1",},
{"lineNum":"  365","line":"        TestCase.new(\"??=\", .NullishAssign),","class":"lineCov","hits":"1","order":"6410","possible_hits":"1",},
{"lineNum":"  366","line":"        TestCase.new(\"&\", .BitAnd),","class":"lineCov","hits":"1","order":"6411","possible_hits":"1",},
{"lineNum":"  367","line":"        TestCase.new(\"&=\", .BitAndAssign),","class":"lineCov","hits":"1","order":"6412","possible_hits":"1",},
{"lineNum":"  368","line":"        TestCase.new(\"&&\", .LogicalAnd),","class":"lineCov","hits":"1","order":"6413","possible_hits":"1",},
{"lineNum":"  369","line":"        TestCase.new(\"&&=\", .LogicalAndAssign),","class":"lineCov","hits":"1","order":"6414","possible_hits":"1",},
{"lineNum":"  370","line":"        TestCase.new(\"|\", .BitOr),","class":"lineCov","hits":"1","order":"6415","possible_hits":"1",},
{"lineNum":"  371","line":"        TestCase.new(\"|=\", .BitOrAssign),","class":"lineCov","hits":"1","order":"6416","possible_hits":"1",},
{"lineNum":"  372","line":"        TestCase.new(\"||\", .LogicalOr),","class":"lineCov","hits":"1","order":"6417","possible_hits":"1",},
{"lineNum":"  373","line":"        TestCase.new(\"||=\", .LogicalOrAssign),","class":"lineCov","hits":"1","order":"6418","possible_hits":"1",},
{"lineNum":"  374","line":"        TestCase.new(\"~\", .BitNot),","class":"lineCov","hits":"1","order":"6419","possible_hits":"1",},
{"lineNum":"  375","line":"        TestCase.new(\"~=\", .BitNotAssign),","class":"lineCov","hits":"1","order":"6420","possible_hits":"1",},
{"lineNum":"  376","line":"        TestCase.new(\"^\", .BitXor),","class":"lineCov","hits":"1","order":"6421","possible_hits":"1",},
{"lineNum":"  377","line":"        TestCase.new(\"^=\", .BitXorAssign),","class":"lineCov","hits":"1","order":"6422","possible_hits":"1",},
{"lineNum":"  378","line":"        TestCase.new(\">>\", .ShiftRight),","class":"lineCov","hits":"1","order":"6423","possible_hits":"1",},
{"lineNum":"  379","line":"        TestCase.new(\">>=\", .ShiftRightAssign),","class":"lineCov","hits":"1","order":"6424","possible_hits":"1",},
{"lineNum":"  380","line":"        TestCase.new(\">>>\", .ShiftRightUnsigned),","class":"lineCov","hits":"1","order":"6425","possible_hits":"1",},
{"lineNum":"  381","line":"        TestCase.new(\">>>=\", .ShiftRightUnsignedAssign),","class":"lineCov","hits":"1","order":"6426","possible_hits":"1",},
{"lineNum":"  382","line":"        TestCase.new(\"<<\", .ShiftLeft),","class":"lineCov","hits":"1","order":"6427","possible_hits":"1",},
{"lineNum":"  383","line":"        TestCase.new(\"<<=\", .ShiftLeftAssign),","class":"lineCov","hits":"1","order":"6428","possible_hits":"1",},
{"lineNum":"  384","line":"    }) |testCase| {","class":"lineCov","hits":"1","order":"6430","possible_hits":"1",},
{"lineNum":"  385","line":"        const res = lexOperator(testCase.str).?;","class":"linePartCov","hits":"1","order":"6431","possible_hits":"2",},
{"lineNum":"  386","line":"        try expectEqual(testCase.ty, res.ty);","class":"linePartCov","hits":"1","order":"6432","possible_hits":"2",},
{"lineNum":"  387","line":"        try expectEqual(testCase.str.len, res.len);","class":"lineCov","hits":"1","order":"6433","possible_hits":"1",},
{"lineNum":"  388","line":"    }"},
{"lineNum":"  389","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:47:41", "instrumented" : 90, "covered" : 81,};
var merged_data = [];
