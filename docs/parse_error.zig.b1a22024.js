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
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"pub const ExpectedData = union(Type) {"},
{"lineNum":"   31","line":"    pub const Type = enum {"},
{"lineNum":"   32","line":"        Token,"},
{"lineNum":"   33","line":"        String,"},
{"lineNum":"   34","line":"    };"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    Token: Token.Type,"},
{"lineNum":"   37","line":"    String: []const u8,"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn new(data: anytype) ExpectedData {","class":"linePartCov","hits":"3","order":"766","possible_hits":"22",},
{"lineNum":"   40","line":"        return switch (@typeInfo(@TypeOf(data))) {","class":"linePartCov","hits":"3","order":"768","possible_hits":"22",},
{"lineNum":"   41","line":"            .Enum => ExpectedData{ .Token = data },","class":"lineCov","hits":"1","order":"767","possible_hits":"1",},
{"lineNum":"   42","line":"            .Pointer => ExpectedData{ .String = data },","class":"linePartCov","hits":"2","order":"2127","possible_hits":"21",},
{"lineNum":"   43","line":"            else => @compileError(\"expected must be a Token.Type or a string\"),"},
{"lineNum":"   44","line":"        };"},
{"lineNum":"   45","line":"    }"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    pub fn getType(self: ExpectedData) Type {","class":"lineCov","hits":"1","order":"2122","possible_hits":"1",},
{"lineNum":"   48","line":"        return @as(Type, self);","class":"lineCov","hits":"1","order":"2123","possible_hits":"1",},
{"lineNum":"   49","line":"    }"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    pub fn write(self: ExpectedData, writer: anytype) !void {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   52","line":"        switch (self) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   53","line":"            .Token => |t| try writer.print(\"{s}\", .{@tagName(t)}),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":"            .String => |s| try writer.print(\"{s}\", .{s}),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   55","line":"        }"},
{"lineNum":"   56","line":"    }"},
{"lineNum":"   57","line":"};"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"test \"can initialize \'ExpectedData\' with a Token.Type\" {","class":"lineCov","hits":"2","order":"2119","possible_hits":"2",},
{"lineNum":"   60","line":"    const tt = Token.Type.Dot;"},
{"lineNum":"   61","line":"    const data = ExpectedData.new(tt);","class":"lineCov","hits":"1","order":"2120","possible_hits":"1",},
{"lineNum":"   62","line":"    try expectEqual(ExpectedData.Token, data.getType());","class":"lineCov","hits":"1","order":"2121","possible_hits":"1",},
{"lineNum":"   63","line":"    try expectEqual(tt, data.Token);","class":"lineCov","hits":"2","order":"2124","possible_hits":"2",},
{"lineNum":"   64","line":"}"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"test \"can initialize \'ExpectedData\' with a string\" {","class":"lineCov","hits":"2","order":"2125","possible_hits":"2",},
{"lineNum":"   67","line":"    const str: []const u8 = \"some expected thing\";"},
{"lineNum":"   68","line":"    const data = ExpectedData.new(str);","class":"lineCov","hits":"1","order":"2126","possible_hits":"1",},
{"lineNum":"   69","line":"    try expectEqual(ExpectedData.String, data.getType());","class":"lineCov","hits":"1","order":"2128","possible_hits":"1",},
{"lineNum":"   70","line":"    try expectEqualStrings(str, data.String);","class":"lineCov","hits":"2","order":"2129","possible_hits":"2",},
{"lineNum":"   71","line":"}"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"pub const FoundData = union(Type) {"},
{"lineNum":"   74","line":"    pub const Type = enum {"},
{"lineNum":"   75","line":"        Token,"},
{"lineNum":"   76","line":"        Node,"},
{"lineNum":"   77","line":"    };"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    Token: Token,"},
{"lineNum":"   80","line":"    Node: Node,"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    pub fn new(data: anytype) FoundData {","class":"lineCov","hits":"2","order":"770","possible_hits":"2",},
{"lineNum":"   83","line":"        return switch (@typeInfo(@TypeOf(data))) {","class":"lineCov","hits":"2","order":"772","possible_hits":"2",},
{"lineNum":"   84","line":"            .Struct => FoundData{ .Token = data },","class":"lineCov","hits":"1","order":"2133","possible_hits":"1",},
{"lineNum":"   85","line":"            .Pointer => FoundData{ .Node = data },","class":"lineCov","hits":"1","order":"771","possible_hits":"1",},
{"lineNum":"   86","line":"            else => @compileError(\"found must be a Token or a Node\"),"},
{"lineNum":"   87","line":"        };"},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    pub fn getCursor(self: FoundData) Cursor {","class":"lineCov","hits":"1","order":"777","possible_hits":"1",},
{"lineNum":"   91","line":"        return switch (self) {","class":"linePartCov","hits":"3","order":"778","possible_hits":"4",},
{"lineNum":"   92","line":"            .Token => self.Token.csr,","class":"linePartCov","hits":"2","order":"2152","possible_hits":"3",},
{"lineNum":"   93","line":"            .Node => self.Node.csr,","class":"linePartCov","hits":"2","order":"779","possible_hits":"3",},
{"lineNum":"   94","line":"        };"},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    pub fn getType(self: FoundData) Type {","class":"lineCov","hits":"1","order":"2135","possible_hits":"1",},
{"lineNum":"   98","line":"        return @as(Type, self);","class":"lineCov","hits":"1","order":"2136","possible_hits":"1",},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    pub fn write(self: FoundData, writer: anytype) !void {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  102","line":"        switch (self) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  103","line":"            .Token => |t| try writer.print(\"{s}\", .{@tagName(t.ty)}),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  104","line":"            .Node => |n| try writer.print(\"{s}\", .{@tagName(n.getType())}),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  105","line":"        }"},
{"lineNum":"  106","line":"    }"},
{"lineNum":"  107","line":"};"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"test \"can initialize \'FoundData\' with a Token\" {","class":"lineCov","hits":"2","order":"2130","possible_hits":"2",},
{"lineNum":"  110","line":"    const tkn = Token.new(Token.Type.Assign, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"2131","possible_hits":"1",},
{"lineNum":"  111","line":"    const data = FoundData.new(tkn);","class":"lineCov","hits":"1","order":"2132","possible_hits":"1",},
{"lineNum":"  112","line":"    try expectEqual(FoundData.Token, data.getType());","class":"lineCov","hits":"1","order":"2134","possible_hits":"1",},
{"lineNum":"  113","line":"    try expectEqual(tkn, data.Token);","class":"lineCov","hits":"2","order":"2137","possible_hits":"2",},
{"lineNum":"  114","line":"}"},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"test \"can initialize \'FoundData\' with a Node\" {","class":"lineCov","hits":"3","order":"2138","possible_hits":"3",},
{"lineNum":"  117","line":"    const found = makeNode(","class":"lineCov","hits":"1","order":"2141","possible_hits":"1",},
{"lineNum":"  118","line":"        std.testing.allocator,"},
{"lineNum":"  119","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"2139","possible_hits":"1",},
{"lineNum":"  120","line":"        NodeType.Decl,"},
{"lineNum":"  121","line":"        Decl.new(.Var, \"aName\", null, null),","class":"lineCov","hits":"1","order":"2140","possible_hits":"1",},
{"lineNum":"  122","line":"    );"},
{"lineNum":"  123","line":"    defer std.testing.allocator.destroy(found);","class":"linePartCov","hits":"1","order":"2145","possible_hits":"3",},
{"lineNum":"  124","line":"    const data = FoundData.new(found);","class":"lineCov","hits":"1","order":"2142","possible_hits":"1",},
{"lineNum":"  125","line":"    try expectEqual(FoundData.Node, data.getType());","class":"linePartCov","hits":"1","order":"2143","possible_hits":"2",},
{"lineNum":"  126","line":"    try expectEqual(found, data.Node);","class":"linePartCov","hits":"2","order":"2144","possible_hits":"3",},
{"lineNum":"  127","line":"}"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"pub const Expected = struct {"},
{"lineNum":"  130","line":"    expected: ExpectedData,"},
{"lineNum":"  131","line":"    found: FoundData,"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    pub fn new(expectedData: anytype, foundData: anytype) Expected {","class":"linePartCov","hits":"3","order":"764","possible_hits":"22",},
{"lineNum":"  134","line":"        return Expected{","class":"linePartCov","hits":"3","order":"773","possible_hits":"22",},
{"lineNum":"  135","line":"            .expected = ExpectedData.new(expectedData),","class":"linePartCov","hits":"3","order":"765","possible_hits":"22",},
{"lineNum":"  136","line":"            .found = FoundData.new(foundData),","class":"linePartCov","hits":"3","order":"769","possible_hits":"22",},
{"lineNum":"  137","line":"        };"},
{"lineNum":"  138","line":"    }"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"    pub fn getCursor(self: Expected) Cursor {","class":"lineCov","hits":"1","order":"775","possible_hits":"1",},
{"lineNum":"  141","line":"        return self.found.getCursor();","class":"lineCov","hits":"1","order":"776","possible_hits":"1",},
{"lineNum":"  142","line":"    }"},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"    pub fn write(self: Expected, writer: anytype) !void {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  145","line":"        try writer.print(\"Expected \", .{});","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  146","line":"        try self.expected.write(writer);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  147","line":"        try writer.print(\" but found \", .{});","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  148","line":"        try self.found.write(writer);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  149","line":"    }"},
{"lineNum":"  150","line":"};"},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"test \"can initialize Expected\" {","class":"lineCov","hits":"2","order":"2146","possible_hits":"2",},
{"lineNum":"  153","line":"    const tokenType = Token.Type.Dot;"},
{"lineNum":"  154","line":"    const foundTkn = Token.new(Token.Type.Assign, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"2147","possible_hits":"1",},
{"lineNum":"  155","line":"    const expected = Expected.new(tokenType, foundTkn);","class":"lineCov","hits":"1","order":"2148","possible_hits":"1",},
{"lineNum":"  156","line":"    try expectEqual(ExpectedData.Type.Token, expected.expected.getType());","class":"lineCov","hits":"1","order":"2149","possible_hits":"1",},
{"lineNum":"  157","line":"    try expectEqual(FoundData.Type.Token, expected.found.getType());","class":"lineCov","hits":"1","order":"2150","possible_hits":"1",},
{"lineNum":"  158","line":"    try expectEqual(foundTkn.csr, expected.getCursor());","class":"lineCov","hits":"1","order":"2151","possible_hits":"1",},
{"lineNum":"  159","line":"}"},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"pub const ParseErrorData = union(Type) {"},
{"lineNum":"  162","line":"    pub const Type = enum {"},
{"lineNum":"  163","line":"        Expected,"},
{"lineNum":"  164","line":"        Message,"},
{"lineNum":"  165","line":"    };"},
{"lineNum":"  166","line":""},
{"lineNum":"  167","line":"    Expected: Expected,"},
{"lineNum":"  168","line":"    Message: []const u8,"},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"    pub fn write(self: ParseErrorData, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2473","possible_hits":"4",},
{"lineNum":"  171","line":"        switch (self) {","class":"linePartCov","hits":"1","order":"2474","possible_hits":"4",},
{"lineNum":"  172","line":"            .Expected => |e| try e.write(writer),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  173","line":"            .Message => |m| try writer.print(\"{s}\", .{m}),","class":"linePartCov","hits":"1","order":"2475","possible_hits":"2",},
{"lineNum":"  174","line":"        }"},
{"lineNum":"  175","line":"    }"},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"    pub fn getType(self: ParseErrorData) Type {","class":"lineCov","hits":"1","order":"800","possible_hits":"1",},
{"lineNum":"  178","line":"        return @as(Type, self);","class":"lineCov","hits":"1","order":"801","possible_hits":"1",},
{"lineNum":"  179","line":"    }"},
{"lineNum":"  180","line":"};"},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"pub const ParseError = struct {"},
{"lineNum":"  183","line":"    pub const Type = ParseErrorData.Type;"},
{"lineNum":"  184","line":""},
{"lineNum":"  185","line":"    csr: Cursor,"},
{"lineNum":"  186","line":"    data: ParseErrorData,"},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"    pub fn expected(expectedData: anytype, foundData: anytype) ParseError {","class":"linePartCov","hits":"3","order":"762","possible_hits":"22",},
{"lineNum":"  189","line":"        const exp = Expected.new(expectedData, foundData);","class":"linePartCov","hits":"3","order":"763","possible_hits":"22",},
{"lineNum":"  190","line":"        return ParseError{","class":"linePartCov","hits":"3","order":"782","possible_hits":"22",},
{"lineNum":"  191","line":"            .csr = exp.getCursor(),","class":"linePartCov","hits":"3","order":"774","possible_hits":"22",},
{"lineNum":"  192","line":"            .data = ParseErrorData{","class":"linePartCov","hits":"3","order":"780","possible_hits":"22",},
{"lineNum":"  193","line":"                .Expected = exp,","class":"linePartCov","hits":"3","order":"781","possible_hits":"22",},
{"lineNum":"  194","line":"            },"},
{"lineNum":"  195","line":"        };"},
{"lineNum":"  196","line":"    }"},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"    pub fn message(csr: Cursor, msg: []const u8) ParseError {","class":"lineCov","hits":"1","order":"2167","possible_hits":"1",},
{"lineNum":"  199","line":"        return ParseError{","class":"lineCov","hits":"1","order":"2170","possible_hits":"1",},
{"lineNum":"  200","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"2168","possible_hits":"1",},
{"lineNum":"  201","line":"            .data = ParseErrorData{"},
{"lineNum":"  202","line":"                .Message = msg,","class":"lineCov","hits":"1","order":"2169","possible_hits":"1",},
{"lineNum":"  203","line":"            },"},
{"lineNum":"  204","line":"        };"},
{"lineNum":"  205","line":"    }"},
{"lineNum":"  206","line":""},
{"lineNum":"  207","line":"    pub fn getType(self: ParseError) ParseErrorData.Type {","class":"lineCov","hits":"1","order":"2157","possible_hits":"1",},
{"lineNum":"  208","line":"        return self.data.getType();","class":"lineCov","hits":"1","order":"2158","possible_hits":"1",},
{"lineNum":"  209","line":"    }"},
{"lineNum":"  210","line":""},
{"lineNum":"  211","line":"    pub fn report(self: ParseError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2468","possible_hits":"4",},
{"lineNum":"  212","line":"        try writer.print(\"Parse Error: {d}:{d}: \", .{","class":"linePartCov","hits":"1","order":"2471","possible_hits":"2",},
{"lineNum":"  213","line":"            self.csr.ln,","class":"linePartCov","hits":"1","order":"2469","possible_hits":"2",},
{"lineNum":"  214","line":"            self.csr.ch,","class":"linePartCov","hits":"1","order":"2470","possible_hits":"2",},
{"lineNum":"  215","line":"        });"},
{"lineNum":"  216","line":""},
{"lineNum":"  217","line":"        try self.data.write(writer);","class":"linePartCov","hits":"1","order":"2472","possible_hits":"2",},
{"lineNum":"  218","line":""},
{"lineNum":"  219","line":"        try writer.print(\"\\n\", .{});","class":"linePartCov","hits":"1","order":"2476","possible_hits":"2",},
{"lineNum":"  220","line":"    }"},
{"lineNum":"  221","line":"};"},
{"lineNum":"  222","line":""},
{"lineNum":"  223","line":"test \"can initialize a \'ParseError\' with an expected type\" {","class":"lineCov","hits":"2","order":"2153","possible_hits":"2",},
{"lineNum":"  224","line":"    const tokenType = Token.Type.Dot;"},
{"lineNum":"  225","line":"    const foundTkn = Token.new(Token.Type.Assign, Cursor.new(0, 0));","class":"lineCov","hits":"1","order":"2154","possible_hits":"1",},
{"lineNum":"  226","line":"    const err = ParseError.expected(tokenType, foundTkn);","class":"lineCov","hits":"1","order":"2155","possible_hits":"1",},
{"lineNum":"  227","line":"    try expectEqual(ParseError.Type.Expected, err.getType());","class":"lineCov","hits":"1","order":"2156","possible_hits":"1",},
{"lineNum":"  228","line":"    try expectEqual(foundTkn.csr, err.csr);","class":"lineCov","hits":"1","order":"2159","possible_hits":"1",},
{"lineNum":"  229","line":"    try expectEqual(","class":"linePartCov","hits":"1","order":"2161","possible_hits":"2",},
{"lineNum":"  230","line":"        ExpectedData.Type.Token,"},
{"lineNum":"  231","line":"        err.data.Expected.expected.getType(),","class":"linePartCov","hits":"2","order":"2160","possible_hits":"3",},
{"lineNum":"  232","line":"    );"},
{"lineNum":"  233","line":"    try expectEqual(","class":"linePartCov","hits":"1","order":"2163","possible_hits":"2",},
{"lineNum":"  234","line":"        FoundData.Type.Token,"},
{"lineNum":"  235","line":"        err.data.Expected.found.getType(),","class":"linePartCov","hits":"2","order":"2162","possible_hits":"3",},
{"lineNum":"  236","line":"    );"},
{"lineNum":"  237","line":"}"},
{"lineNum":"  238","line":""},
{"lineNum":"  239","line":"test \"can initialize a \'ParseError\' with an error message string\" {","class":"lineCov","hits":"2","order":"2164","possible_hits":"2",},
{"lineNum":"  240","line":"    const csr = Cursor.new(2, 4);","class":"lineCov","hits":"1","order":"2165","possible_hits":"1",},
{"lineNum":"  241","line":"    const message: []const u8 = \"any error message\";"},
{"lineNum":"  242","line":"    const err = ParseError.message(csr, message);","class":"lineCov","hits":"1","order":"2166","possible_hits":"1",},
{"lineNum":"  243","line":"    try expectEqual(ParseError.Type.Message, err.getType());","class":"lineCov","hits":"1","order":"2171","possible_hits":"1",},
{"lineNum":"  244","line":"    try expectEqual(csr, err.csr);","class":"lineCov","hits":"1","order":"2172","possible_hits":"1",},
{"lineNum":"  245","line":"    try expectEqualStrings(message, err.data.Message);","class":"lineCov","hits":"2","order":"2173","possible_hits":"2",},
{"lineNum":"  246","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 17:36:19", "instrumented" : 101, "covered" : 87,};
var merged_data = [];
