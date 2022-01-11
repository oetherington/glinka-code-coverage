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
{"lineNum":"   19","line":"const WriteContext = @import(\"../writer.zig\").WriteContext;"},
{"lineNum":"   20","line":"const nodeImp = @import(\"../node.zig\");"},
{"lineNum":"   21","line":"const NodeType = nodeImp.NodeType;"},
{"lineNum":"   22","line":"const NodeData = nodeImp.NodeData;"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"pub fn DumpTestCase(comptime T: type, comptime nodeType: NodeType) type {"},
{"lineNum":"   25","line":"    return struct {"},
{"lineNum":"   26","line":"        value: T,"},
{"lineNum":"   27","line":"        expected: []const u8,"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"        pub fn run(self: @This()) !void {","class":"lineCov","hits":"72","order":"735","possible_hits":"72",},
{"lineNum":"   30","line":"            const ctx = try WriteContext(.{}).new(std.testing.allocator);","class":"lineCov","hits":"24","order":"736","possible_hits":"24",},
{"lineNum":"   31","line":"            defer ctx.deinit();","class":"linePartCov","hits":"24","order":"766","possible_hits":"96",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"            const data = @unionInit(NodeData, @tagName(nodeType), self.value);","class":"lineCov","hits":"23","order":"737","possible_hits":"23",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"            try data.dump(ctx.writer(), 0);","class":"linePartCov","hits":"24","order":"738","possible_hits":"48",},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"            const str = try ctx.toString();","class":"linePartCov","hits":"24","order":"763","possible_hits":"48",},
{"lineNum":"   38","line":"            defer ctx.freeString(str);","class":"linePartCov","hits":"24","order":"765","possible_hits":"48",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"            try std.testing.expectEqualStrings(self.expected, str);","class":"linePartCov","hits":"24","order":"764","possible_hits":"48",},
{"lineNum":"   41","line":"        }"},
{"lineNum":"   42","line":"    };"},
{"lineNum":"   43","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-11 20:42:28", "instrumented" : 8, "covered" : 8,};
var merged_data = [];
