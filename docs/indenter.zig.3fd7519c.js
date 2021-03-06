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
{"lineNum":"   20","line":"const WriteContext = @import(\"../writer.zig\").WriteContext;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"pub fn putInd(","class":"lineCov","hits":"56","order":"164","possible_hits":"56",},
{"lineNum":"   23","line":"    writer: anytype,"},
{"lineNum":"   24","line":"    indent: usize,"},
{"lineNum":"   25","line":"    comptime fmt: []const u8,"},
{"lineNum":"   26","line":"    args: anytype,"},
{"lineNum":"   27","line":") !void {","class":"lineCov","hits":"56","order":"168","possible_hits":"56",},
{"lineNum":"   28","line":"    var i: usize = 0;","class":"lineCov","hits":"56","order":"165","possible_hits":"56",},
{"lineNum":"   29","line":"    while (i < indent) : (i += 1) {","class":"linePartCov","hits":"82","order":"166","possible_hits":"168",},
{"lineNum":"   30","line":"        try writer.print(\" \", .{});","class":"linePartCov","hits":"26","order":"176","possible_hits":"56",},
{"lineNum":"   31","line":"    }"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    try writer.print(fmt, args);","class":"lineCov","hits":"56","order":"167","possible_hits":"56",},
{"lineNum":"   34","line":"}"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"test \"can format strings with indentation\" {","class":"lineCov","hits":"3","order":"7247","possible_hits":"3",},
{"lineNum":"   37","line":"    const ctx = try WriteContext(.{}).new(std.testing.allocator);","class":"lineCov","hits":"1","order":"7248","possible_hits":"1",},
{"lineNum":"   38","line":"    defer ctx.deinit();","class":"linePartCov","hits":"1","order":"7254","possible_hits":"5",},
{"lineNum":"   39","line":"    try putInd(ctx.writer(), 0, \"hello {s}\\n\", .{\"world\"});","class":"linePartCov","hits":"1","order":"7249","possible_hits":"2",},
{"lineNum":"   40","line":"    try putInd(ctx.writer(), 4, \"hello {s}\\n\", .{\"world\"});","class":"linePartCov","hits":"1","order":"7250","possible_hits":"2",},
{"lineNum":"   41","line":"    const str = try ctx.toString();","class":"linePartCov","hits":"1","order":"7251","possible_hits":"2",},
{"lineNum":"   42","line":"    defer ctx.freeString(str);","class":"linePartCov","hits":"1","order":"7253","possible_hits":"2",},
{"lineNum":"   43","line":"    try expectEqualStrings(\"hello world\\n    hello world\\n\", str);","class":"linePartCov","hits":"1","order":"7252","possible_hits":"2",},
{"lineNum":"   44","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:59:30", "instrumented" : 14, "covered" : 14,};
var merged_data = [];
