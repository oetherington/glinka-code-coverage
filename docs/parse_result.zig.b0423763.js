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
{"lineNum":"   22","line":"const Cursor = @import(\"cursor.zig\").Cursor;"},
{"lineNum":"   23","line":"const Token = @import(\"token.zig\").Token;"},
{"lineNum":"   24","line":"const node = @import(\"node.zig\");"},
{"lineNum":"   25","line":"const Node = node.Node;"},
{"lineNum":"   26","line":"const NodeType = node.NodeType;"},
{"lineNum":"   27","line":"const makeNode = node.makeNode;"},
{"lineNum":"   28","line":"const Decl = node.Decl;"},
{"lineNum":"   29","line":"const ParseError = @import(\"parse_error.zig\").ParseError;"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"pub const ParseResult = union(Type) {"},
{"lineNum":"   32","line":"    pub const Type = enum {"},
{"lineNum":"   33","line":"        Success,"},
{"lineNum":"   34","line":"        Error,"},
{"lineNum":"   35","line":"        NoMatch,"},
{"lineNum":"   36","line":"    };"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    Success: Node,"},
{"lineNum":"   39","line":"    Error: ParseError,"},
{"lineNum":"   40","line":"    NoMatch: ?ParseError,"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    pub fn success(n: Node) ParseResult {","class":"lineCov","hits":"1","order":"2596","possible_hits":"1",},
{"lineNum":"   43","line":"        return ParseResult{","class":"lineCov","hits":"1","order":"2598","possible_hits":"1",},
{"lineNum":"   44","line":"            .Success = n,","class":"lineCov","hits":"1","order":"2597","possible_hits":"1",},
{"lineNum":"   45","line":"        };"},
{"lineNum":"   46","line":"    }"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    pub fn err(e: ParseError) ParseResult {","class":"lineCov","hits":"1","order":"2614","possible_hits":"1",},
{"lineNum":"   49","line":"        return ParseResult{","class":"lineCov","hits":"1","order":"2616","possible_hits":"1",},
{"lineNum":"   50","line":"            .Error = e,","class":"lineCov","hits":"1","order":"2615","possible_hits":"1",},
{"lineNum":"   51","line":"        };"},
{"lineNum":"   52","line":"    }"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    pub fn errMessage(csr: Cursor, message: []const u8) ParseResult {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"        return ParseResult.err(ParseError.message(csr, message));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"    }"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    pub fn expected(expectedData: anytype, foundData: anytype) ParseResult {","class":"linePartCov","hits":"1","order":"2626","possible_hits":"24",},
{"lineNum":"   59","line":"        return ParseResult.err(ParseError.expected(expectedData, foundData));","class":"linePartCov","hits":"1","order":"2627","possible_hits":"24",},
{"lineNum":"   60","line":"    }"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    pub fn noMatch(e: ?ParseError) ParseResult {","class":"lineCov","hits":"1","order":"2636","possible_hits":"1",},
{"lineNum":"   63","line":"        return ParseResult{","class":"lineCov","hits":"1","order":"2638","possible_hits":"1",},
{"lineNum":"   64","line":"            .NoMatch = e,","class":"lineCov","hits":"1","order":"2637","possible_hits":"1",},
{"lineNum":"   65","line":"        };"},
{"lineNum":"   66","line":"    }"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    pub fn noMatchExpected(","class":"lineCov","hits":"1","order":"4478","possible_hits":"1",},
{"lineNum":"   69","line":"        expectedData: anytype,"},
{"lineNum":"   70","line":"        foundData: anytype,"},
{"lineNum":"   71","line":"    ) ParseResult {"},
{"lineNum":"   72","line":"        return ParseResult.noMatch(ParseError.expected(","class":"lineCov","hits":"1","order":"4481","possible_hits":"1",},
{"lineNum":"   73","line":"            expectedData,","class":"lineCov","hits":"1","order":"4479","possible_hits":"1",},
{"lineNum":"   74","line":"            foundData,","class":"lineCov","hits":"1","order":"4480","possible_hits":"1",},
{"lineNum":"   75","line":"        ));"},
{"lineNum":"   76","line":"    }"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    pub fn getType(self: ParseResult) Type {","class":"lineCov","hits":"1","order":"2600","possible_hits":"1",},
{"lineNum":"   79","line":"        return @as(Type, self);","class":"lineCov","hits":"1","order":"2601","possible_hits":"1",},
{"lineNum":"   80","line":"    }"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    pub fn isSuccess(self: ParseResult) bool {","class":"lineCov","hits":"1","order":"2604","possible_hits":"1",},
{"lineNum":"   83","line":"        return @as(Type, self) == .Success;","class":"lineCov","hits":"1","order":"2605","possible_hits":"1",},
{"lineNum":"   84","line":"    }"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    pub fn isError(self: ParseResult) bool {","class":"lineCov","hits":"1","order":"3016","possible_hits":"1",},
{"lineNum":"   87","line":"        return @as(Type, self) == .Error;","class":"lineCov","hits":"1","order":"3017","possible_hits":"1",},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    pub fn isNoMatch(self: ParseResult) bool {","class":"lineCov","hits":"1","order":"3019","possible_hits":"1",},
{"lineNum":"   91","line":"        return @as(Type, self) == .NoMatch;","class":"lineCov","hits":"1","order":"3020","possible_hits":"1",},
{"lineNum":"   92","line":"    }"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    pub fn reportIfError(self: ParseResult, writer: anytype) !void {","class":"lineCov","hits":"2","order":"3039","possible_hits":"2",},
{"lineNum":"   95","line":"        switch (self) {","class":"linePartCov","hits":"1","order":"3040","possible_hits":"3",},
{"lineNum":"   96","line":"            .Success => {},"},
{"lineNum":"   97","line":"            .Error => |err| try err.report(writer),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"            .NoMatch => |err| if (err) |e| try e.report(writer),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   99","line":"        }"},
{"lineNum":"  100","line":"    }"},
{"lineNum":"  101","line":"};"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"test \"can initialize \'Success\' parse result\" {","class":"lineCov","hits":"3","order":"2591","possible_hits":"3",},
{"lineNum":"  104","line":"    const n = makeNode(","class":"lineCov","hits":"1","order":"2594","possible_hits":"1",},
{"lineNum":"  105","line":"        std.testing.allocator,"},
{"lineNum":"  106","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"2592","possible_hits":"1",},
{"lineNum":"  107","line":"        NodeType.Decl,"},
{"lineNum":"  108","line":"        Decl.new(.Var, \"aName\", null, null),","class":"lineCov","hits":"1","order":"2593","possible_hits":"1",},
{"lineNum":"  109","line":"    );"},
{"lineNum":"  110","line":"    defer std.testing.allocator.destroy(n);","class":"linePartCov","hits":"1","order":"2606","possible_hits":"4",},
{"lineNum":"  111","line":"    const res = ParseResult.success(n);","class":"lineCov","hits":"1","order":"2595","possible_hits":"1",},
{"lineNum":"  112","line":"    try expectEqual(ParseResult.Type.Success, res.getType());","class":"linePartCov","hits":"1","order":"2599","possible_hits":"2",},
{"lineNum":"  113","line":"    try expectEqual(n, res.Success);","class":"linePartCov","hits":"2","order":"2602","possible_hits":"3",},
{"lineNum":"  114","line":"    try expect(res.isSuccess());","class":"linePartCov","hits":"1","order":"2603","possible_hits":"2",},
{"lineNum":"  115","line":"}"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"test \"can initialize \'Error\' parse result\" {","class":"lineCov","hits":"3","order":"2607","possible_hits":"3",},
{"lineNum":"  118","line":"    const expected = Token.Type.Dot;"},
{"lineNum":"  119","line":"    const found = makeNode(","class":"lineCov","hits":"1","order":"2610","possible_hits":"1",},
{"lineNum":"  120","line":"        std.testing.allocator,"},
{"lineNum":"  121","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"2608","possible_hits":"1",},
{"lineNum":"  122","line":"        NodeType.Decl,"},
{"lineNum":"  123","line":"        Decl.new(.Var, \"aName\", null, null),","class":"lineCov","hits":"1","order":"2609","possible_hits":"1",},
{"lineNum":"  124","line":"    );"},
{"lineNum":"  125","line":"    defer std.testing.allocator.destroy(found);","class":"linePartCov","hits":"1","order":"2620","possible_hits":"4",},
{"lineNum":"  126","line":"    const err = ParseError.expected(expected, found);","class":"lineCov","hits":"1","order":"2611","possible_hits":"1",},
{"lineNum":"  127","line":"    const res = ParseResult.err(err);","class":"lineCov","hits":"1","order":"2613","possible_hits":"1",},
{"lineNum":"  128","line":"    try expectEqual(ParseResult.Type.Error, res.getType());","class":"linePartCov","hits":"1","order":"2617","possible_hits":"2",},
{"lineNum":"  129","line":"    try expectEqual(err, res.Error);","class":"linePartCov","hits":"2","order":"2618","possible_hits":"3",},
{"lineNum":"  130","line":"    try expect(!res.isSuccess());","class":"linePartCov","hits":"1","order":"2619","possible_hits":"2",},
{"lineNum":"  131","line":"}"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"test \"can initialize \'expected\' parse result\" {","class":"lineCov","hits":"3","order":"2621","possible_hits":"3",},
{"lineNum":"  134","line":"    const expected = Token.Type.Dot;"},
{"lineNum":"  135","line":"    const found = makeNode(","class":"lineCov","hits":"1","order":"2624","possible_hits":"1",},
{"lineNum":"  136","line":"        std.testing.allocator,"},
{"lineNum":"  137","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"2622","possible_hits":"1",},
{"lineNum":"  138","line":"        NodeType.Decl,"},
{"lineNum":"  139","line":"        Decl.new(.Var, \"aName\", null, null),","class":"lineCov","hits":"1","order":"2623","possible_hits":"1",},
{"lineNum":"  140","line":"    );"},
{"lineNum":"  141","line":"    defer std.testing.allocator.destroy(found);","class":"linePartCov","hits":"1","order":"2633","possible_hits":"6",},
{"lineNum":"  142","line":"    const res = ParseResult.expected(expected, found);","class":"lineCov","hits":"1","order":"2625","possible_hits":"1",},
{"lineNum":"  143","line":"    try expectEqual(ParseResult.Type.Error, res.getType());","class":"linePartCov","hits":"1","order":"2628","possible_hits":"2",},
{"lineNum":"  144","line":"    try expectEqual(ParseError.Type.Expected, res.Error.data.getType());","class":"linePartCov","hits":"2","order":"2629","possible_hits":"3",},
{"lineNum":"  145","line":"    try expectEqual(expected, res.Error.data.Expected.expected.Token);","class":"linePartCov","hits":"2","order":"2630","possible_hits":"3",},
{"lineNum":"  146","line":"    try expectEqual(found, res.Error.data.Expected.found.Node);","class":"linePartCov","hits":"2","order":"2631","possible_hits":"3",},
{"lineNum":"  147","line":"    try expect(!res.isSuccess());","class":"linePartCov","hits":"1","order":"2632","possible_hits":"2",},
{"lineNum":"  148","line":"}"},
{"lineNum":"  149","line":""},
{"lineNum":"  150","line":"test \"can initialize \'NoMatch\' parse result without a payload\" {","class":"lineCov","hits":"2","order":"2634","possible_hits":"2",},
{"lineNum":"  151","line":"    const res = ParseResult.noMatch(null);","class":"lineCov","hits":"1","order":"2635","possible_hits":"1",},
{"lineNum":"  152","line":"    try expectEqual(ParseResult.Type.NoMatch, res.getType());","class":"lineCov","hits":"1","order":"2639","possible_hits":"1",},
{"lineNum":"  153","line":"    try expect(res.NoMatch == null);","class":"lineCov","hits":"2","order":"2640","possible_hits":"2",},
{"lineNum":"  154","line":"    try expect(!res.isSuccess());","class":"lineCov","hits":"1","order":"2641","possible_hits":"1",},
{"lineNum":"  155","line":"}"},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"test \"can initialize \'NoMatch\' parse result with a payload\" {","class":"lineCov","hits":"3","order":"2642","possible_hits":"3",},
{"lineNum":"  158","line":"    const expected = Token.Type.Dot;"},
{"lineNum":"  159","line":"    const found = makeNode(","class":"lineCov","hits":"1","order":"2645","possible_hits":"1",},
{"lineNum":"  160","line":"        std.testing.allocator,"},
{"lineNum":"  161","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"2643","possible_hits":"1",},
{"lineNum":"  162","line":"        NodeType.Decl,"},
{"lineNum":"  163","line":"        Decl.new(.Var, \"aName\", null, null),","class":"lineCov","hits":"1","order":"2644","possible_hits":"1",},
{"lineNum":"  164","line":"    );"},
{"lineNum":"  165","line":"    defer std.testing.allocator.destroy(found);","class":"linePartCov","hits":"1","order":"2650","possible_hits":"3",},
{"lineNum":"  166","line":"    const err = ParseError.expected(expected, found);","class":"lineCov","hits":"1","order":"2646","possible_hits":"1",},
{"lineNum":"  167","line":"    const res = ParseResult.noMatch(err);","class":"lineCov","hits":"1","order":"2647","possible_hits":"1",},
{"lineNum":"  168","line":"    try expectEqual(ParseResult.Type.NoMatch, res.getType());","class":"linePartCov","hits":"1","order":"2648","possible_hits":"2",},
{"lineNum":"  169","line":"    try expectEqual(err, res.NoMatch.?);","class":"linePartCov","hits":"2","order":"2649","possible_hits":"3",},
{"lineNum":"  170","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:49:31", "instrumented" : 73, "covered" : 69,};
var merged_data = [];
