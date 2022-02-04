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
{"lineNum":"   19","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   20","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   21","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   23","line":"const Node = node.Node;"},
{"lineNum":"   24","line":"const makeNode = node.makeNode;"},
{"lineNum":"   25","line":"const JsBackend = @import(\"js_backend.zig\").JsBackend;"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"pub const EmitTestCase = struct {"},
{"lineNum":"   28","line":"    inputNode: Node,"},
{"lineNum":"   29","line":"    expectedOutput: []const u8,"},
{"lineNum":"   30","line":"    cleanup: ?fn (alloc: Allocator, nd: Node) void = null,"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    pub fn run(self: EmitTestCase) !void {","class":"lineCov","hits":"3","order":"5517","possible_hits":"3",},
{"lineNum":"   33","line":"        var backend = try JsBackend.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"5518","possible_hits":"1",},
{"lineNum":"   34","line":"        defer backend.deinit();","class":"linePartCov","hits":"1","order":"5535","possible_hits":"4",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"        try backend.backend.processNode(self.inputNode);","class":"linePartCov","hits":"1","order":"5519","possible_hits":"2",},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"        const str = try backend.toString();","class":"linePartCov","hits":"1","order":"5530","possible_hits":"2",},
{"lineNum":"   39","line":"        defer backend.freeString(str);","class":"linePartCov","hits":"1","order":"5534","possible_hits":"2",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"        try expectEqualStrings(self.expectedOutput, str);","class":"linePartCov","hits":"1","order":"5531","possible_hits":"2",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"        if (self.cleanup) |cleanup|","class":"lineCov","hits":"2","order":"5532","possible_hits":"2",},
{"lineNum":"   44","line":"            cleanup(std.testing.allocator, self.inputNode);","class":"lineCov","hits":"1","order":"6007","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"        std.testing.allocator.destroy(self.inputNode);","class":"lineCov","hits":"1","order":"5533","possible_hits":"1",},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    pub fn makeNode(comptime ty: node.NodeType, data: anytype) Node {","class":"lineCov","hits":"43","order":"5510","possible_hits":"43",},
{"lineNum":"   50","line":"        return node.makeNode(","class":"lineCov","hits":"43","order":"5513","possible_hits":"43",},
{"lineNum":"   51","line":"            std.testing.allocator,"},
{"lineNum":"   52","line":"            Cursor.new(0, 0),","class":"lineCov","hits":"43","order":"5511","possible_hits":"43",},
{"lineNum":"   53","line":"            ty,"},
{"lineNum":"   54","line":"            data,","class":"lineCov","hits":"36","order":"5512","possible_hits":"36",},
{"lineNum":"   55","line":"        );"},
{"lineNum":"   56","line":"    }"},
{"lineNum":"   57","line":"};"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:49:31", "instrumented" : 14, "covered" : 14,};
var merged_data = [];
