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
{"lineNum":"   19","line":"const version = @import(\"version.zig\").version;"},
{"lineNum":"   20","line":"const TsParser = @import(\"frontend/ts_parser.zig\").TsParser;"},
{"lineNum":"   21","line":"const Parser = @import(\"common/parser.zig\").Parser;"},
{"lineNum":"   22","line":"const Backend = @import(\"common/backend.zig\").Backend;"},
{"lineNum":"   23","line":"const JsBackend = @import(\"backends/js/js_backend.zig\").JsBackend;"},
{"lineNum":"   24","line":"const Compiler = @import(\"compiler/compiler.zig\").Compiler;"},
{"lineNum":"   25","line":"const Config = @import(\"common/config.zig\").Config;"},
{"lineNum":"   26","line":"const Driver = @import(\"common/driver.zig\").Driver;"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"pub fn main() !void {","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   29","line":"    try std.io.getStdOut().writer().print(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"        \"Glinka - version {d}.{d}.{d}{s}{s}\\n\","},
{"lineNum":"   31","line":"        .{"},
{"lineNum":"   32","line":"            version.major,"},
{"lineNum":"   33","line":"            version.minor,"},
{"lineNum":"   34","line":"            version.patch,"},
{"lineNum":"   35","line":"            if (version.pre) |pre| \"-\" ++ pre else \"\","},
{"lineNum":"   36","line":"            if (version.build) |build| \"-\" ++ build else \"\","},
{"lineNum":"   37","line":"        },"},
{"lineNum":"   38","line":"    );"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    var gpa = std.heap.GeneralPurposeAllocator(.{}){};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"    defer _ = gpa.deinit();","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"   42","line":"    var alloc = gpa.allocator();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    const config = Config{};"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    const driver = Driver(TsParser){};"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    var backend = try JsBackend.new(alloc);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":"    defer backend.deinit();","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    var compiler = Compiler.new(alloc, &config, &backend.backend);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"    defer compiler.deinit();","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    const path = \"examples/example_1.ts\";"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    try compiler.compile(driver, path);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    if (compiler.hasErrors()) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   59","line":"        try compiler.reportErrors();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"    } else {"},
{"lineNum":"   61","line":"        var res = try backend.toString();","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   62","line":"        defer backend.freeString(res);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"        std.log.info(\"Result: {s}\", .{res});","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"    }"},
{"lineNum":"   65","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-30 12:37:28", "instrumented" : 15, "covered" : 0,};
var merged_data = [];
