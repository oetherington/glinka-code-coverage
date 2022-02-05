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
{"lineNum":"   28","line":"fn printVersion() !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
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
{"lineNum":"   39","line":"}"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"fn printHelp() !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"    try printVersion();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    try std.io.getStdOut().writer().print(\"TODO: Write help message\", .{});","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"}"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"pub fn main() !u8 {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    var gpa = std.heap.GeneralPurposeAllocator(.{}){};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"    defer _ = gpa.deinit();","class":"lineNoCov","hits":"0","possible_hits":"14",},
{"lineNum":"   49","line":"    var alloc = gpa.allocator();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    const args = try std.process.argsAlloc(alloc);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   52","line":"    defer std.process.argsFree(alloc, args);","class":"lineNoCov","hits":"0","possible_hits":"13",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    for (args) |arg| {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   55","line":"        if (std.mem.eql(u8, arg, \"--version\") or std.mem.eql(u8, arg, \"-v\")) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":"            try printVersion();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   57","line":"            return 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   58","line":"        }"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"        if (std.mem.eql(u8, arg, \"--help\") or std.mem.eql(u8, arg, \"-h\")) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   61","line":"            try printHelp();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   62","line":"            return 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   63","line":"        }"},
{"lineNum":"   64","line":"    }"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    const path = if (args.len == 2)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":"        args[1]","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   68","line":"    else {"},
{"lineNum":"   69","line":"        try std.io.getStdErr().writer().print(\"No filename provided\", .{});","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":"        return 1;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   71","line":"    };"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    const config = Config{};"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    var driver = Driver(TsParser).new(alloc);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"    defer driver.deinit();","class":"lineNoCov","hits":"0","possible_hits":"7",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    var backend = try JsBackend.new(alloc);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   79","line":"    defer backend.deinit();","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    var compiler = Compiler.new(alloc, &config, &backend.backend);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    defer compiler.deinit();","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"    try compiler.compile(&driver, path);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    if (compiler.hasErrors()) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"        try compiler.reportErrors();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   88","line":"        return 1;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   89","line":"    } else {"},
{"lineNum":"   90","line":"        var res = try backend.toString();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   91","line":"        defer backend.freeString(res);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   92","line":"        try std.io.getStdOut().writer().print(\"{s}\", .{res});","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    return 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   96","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-05 11:16:48", "instrumented" : 36, "covered" : 0,};
var merged_data = [];
