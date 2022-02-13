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
{"lineNum":"   20","line":"const WriteContext = @import(\"../../common/writer.zig\").WriteContext;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"pub fn reportTestCase(err: anytype, expectedMessage: []const u8) !void {","class":"lineCov","hits":"6","order":"2290","possible_hits":"6",},
{"lineNum":"   23","line":"    var ctx = try WriteContext(.{}).new(std.testing.allocator);","class":"lineCov","hits":"2","order":"2291","possible_hits":"2",},
{"lineNum":"   24","line":"    defer ctx.deinit();","class":"linePartCov","hits":"2","order":"2311","possible_hits":"8",},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"    try err.report(ctx.writer());","class":"linePartCov","hits":"2","order":"2292","possible_hits":"4",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    const report = try ctx.toString();","class":"linePartCov","hits":"2","order":"2308","possible_hits":"4",},
{"lineNum":"   29","line":"    defer ctx.freeString(report);","class":"linePartCov","hits":"2","order":"2310","possible_hits":"4",},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"    try expectEqualStrings(expectedMessage, report);","class":"linePartCov","hits":"2","order":"2309","possible_hits":"4",},
{"lineNum":"   32","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 12:34:35", "instrumented" : 7, "covered" : 7,};
var merged_data = [];
