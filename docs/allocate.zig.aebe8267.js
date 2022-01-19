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
{"lineNum":"   19","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"pub fn create(a: Allocator, comptime T: type) *T {","class":"lineCov","hits":"2","order":"212","possible_hits":"2",},
{"lineNum":"   22","line":"    return a.create(T) catch reportAndExit();","class":"lineCov","hits":"2","order":"213","possible_hits":"2",},
{"lineNum":"   23","line":"}"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"pub fn alloc(a: Allocator, comptime T: type, n: usize) []T {","class":"lineCov","hits":"2","order":"317","possible_hits":"2",},
{"lineNum":"   26","line":"    return a.alloc(T, n) catch reportAndExit();","class":"lineCov","hits":"2","order":"318","possible_hits":"2",},
{"lineNum":"   27","line":"}"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"pub fn reportAndExit() noreturn {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    const stderr = std.io.getStdOut().writer();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"    stderr.print(\"*** Out of memory ***\\n\", .{}) catch unreachable;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"    std.debug.dumpCurrentStackTrace(null);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"    std.process.exit(1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 21:33:16", "instrumented" : 9, "covered" : 4,};
var merged_data = [];
