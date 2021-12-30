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
{"lineNum":"   21","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   22","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   23","line":"const Arena = std.heap.ArenaAllocator;"},
{"lineNum":"   24","line":"const Parser = @import(\"../common/parser.zig\").Parser;"},
{"lineNum":"   25","line":"const Cursor = @import(\"../common/cursor.zig\").Cursor;"},
{"lineNum":"   26","line":"const node = @import(\"../common/node.zig\");"},
{"lineNum":"   27","line":"const Node = node.Node;"},
{"lineNum":"   28","line":"const NodeType = node.NodeType;"},
{"lineNum":"   29","line":"const makeNode = node.makeNode;"},
{"lineNum":"   30","line":"const Decl = node.Decl;"},
{"lineNum":"   31","line":"const TokenType = @import(\"../common/token.zig\").TokenType;"},
{"lineNum":"   32","line":"const parseresult = @import(\"../common/parse_result.zig\");"},
{"lineNum":"   33","line":"const ParseResult = parseresult.ParseResult;"},
{"lineNum":"   34","line":"const ParseError = @import(\"../common/parse_error.zig\").ParseError;"},
{"lineNum":"   35","line":"const exprParser = @import(\"expr_parser.zig\");"},
{"lineNum":"   36","line":"const typeParser = @import(\"type_parser.zig\");"},
{"lineNum":"   37","line":"const stmtParser = @import(\"stmt_parser.zig\");"},
{"lineNum":"   38","line":"const Lexer = @import(\"lexer.zig\").Lexer;"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"pub const TsParser = struct {"},
{"lineNum":"   41","line":"    pub const Error = Allocator.Error;"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    arena: *Arena,"},
{"lineNum":"   44","line":"    lexer: Lexer,"},
{"lineNum":"   45","line":"    parser: Parser,"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    pub fn new(arena: *Arena, code: []const u8) TsParser {","class":"lineCov","hits":"1","order":"4","possible_hits":"1",},
{"lineNum":"   48","line":"        var lexer = Lexer.new(code);","class":"lineCov","hits":"1","order":"5","possible_hits":"1",},
{"lineNum":"   49","line":"        _ = lexer.next();","class":"lineCov","hits":"1","order":"23","possible_hits":"1",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"        return TsParser{","class":"lineCov","hits":"1","order":"58","possible_hits":"1",},
{"lineNum":"   52","line":"            .arena = arena,","class":"lineCov","hits":"1","order":"51","possible_hits":"1",},
{"lineNum":"   53","line":"            .lexer = lexer,","class":"lineCov","hits":"1","order":"52","possible_hits":"1",},
{"lineNum":"   54","line":"            .parser = Parser{"},
{"lineNum":"   55","line":"                .callbacks = .{"},
{"lineNum":"   56","line":"                    .currentCursor = TsParser.currentCursor,","class":"lineCov","hits":"1","order":"53","possible_hits":"1",},
{"lineNum":"   57","line":"                    .parseExpr = exprParser.parseExpr,","class":"lineCov","hits":"1","order":"54","possible_hits":"1",},
{"lineNum":"   58","line":"                    .parseType = typeParser.parseType,","class":"lineCov","hits":"1","order":"55","possible_hits":"1",},
{"lineNum":"   59","line":"                    .parseBlock = stmtParser.parseBlock,","class":"lineCov","hits":"1","order":"56","possible_hits":"1",},
{"lineNum":"   60","line":"                    .parseStmt = stmtParser.parseStmt,","class":"lineCov","hits":"1","order":"57","possible_hits":"1",},
{"lineNum":"   61","line":"                },"},
{"lineNum":"   62","line":"            },"},
{"lineNum":"   63","line":"        };"},
{"lineNum":"   64","line":"    }"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    pub fn getAllocator(self: *TsParser) Allocator {","class":"lineCov","hits":"1","order":"1782","possible_hits":"1",},
{"lineNum":"   67","line":"        return self.arena.allocator();","class":"lineCov","hits":"1","order":"1783","possible_hits":"1",},
{"lineNum":"   68","line":"    }"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    pub fn getParser(self: *TsParser) *Parser {","class":"lineCov","hits":"1","order":"1736","possible_hits":"1",},
{"lineNum":"   71","line":"        return &self.parser;","class":"lineCov","hits":"1","order":"1737","possible_hits":"1",},
{"lineNum":"   72","line":"    }"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    pub fn currentCursor(psr: *Parser) Cursor {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"        const self = @fieldParentPtr(TsParser, \"parser\", psr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"        return self.lexer.token.csr;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    }"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    pub fn parseExpr(self: *TsParser) ParseResult {","class":"lineCov","hits":"1","order":"1761","possible_hits":"1",},
{"lineNum":"   80","line":"        return exprParser.parseExpr(self.getParser());","class":"lineCov","hits":"1","order":"1762","possible_hits":"1",},
{"lineNum":"   81","line":"    }"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    pub fn parseType(self: *TsParser) ParseResult {","class":"lineCov","hits":"1","order":"1971","possible_hits":"1",},
{"lineNum":"   84","line":"        return typeParser.parseType(self.getParser());","class":"lineCov","hits":"1","order":"1972","possible_hits":"1",},
{"lineNum":"   85","line":"    }"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"    pub fn parseBlock(self: *TsParser) ParseResult {","class":"lineCov","hits":"1","order":"2012","possible_hits":"1",},
{"lineNum":"   88","line":"        return stmtParser.parseBlock(self.getParser());","class":"lineCov","hits":"1","order":"2013","possible_hits":"1",},
{"lineNum":"   89","line":"    }"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    pub fn parseStmt(self: *TsParser) ParseResult {","class":"lineCov","hits":"1","order":"2550","possible_hits":"1",},
{"lineNum":"   92","line":"        return stmtParser.parseStmt(self.getParser());","class":"lineCov","hits":"1","order":"2551","possible_hits":"1",},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    pub fn next(self: *TsParser) ParseResult {"},
{"lineNum":"   96","line":"        return self.parseStmt();"},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":"};"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"test \"TsParser can be initialized\" {","class":"lineCov","hits":"3","order":"1","possible_hits":"3",},
{"lineNum":"  101","line":"    const code: []const u8 = \"some sample code\";"},
{"lineNum":"  102","line":"    var arena = Arena.init(std.testing.allocator);","class":"lineCov","hits":"1","order":"2","possible_hits":"1",},
{"lineNum":"  103","line":"    defer arena.deinit();","class":"linePartCov","hits":"1","order":"60","possible_hits":"2",},
{"lineNum":"  104","line":"    var parser = TsParser.new(&arena, code);","class":"lineCov","hits":"1","order":"3","possible_hits":"1",},
{"lineNum":"  105","line":"    try expectEqualStrings(code, parser.lexer.code);","class":"linePartCov","hits":"1","order":"59","possible_hits":"2",},
{"lineNum":"  106","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-30 12:50:24", "instrumented" : 31, "covered" : 28,};
var merged_data = [];
