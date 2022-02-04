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
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   21","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   22","line":"const ParseError = @import(\"../../common/parse_error.zig\").ParseError;"},
{"lineNum":"   23","line":"const compileError = @import(\"compile_error.zig\");"},
{"lineNum":"   24","line":"const CompileErrorType = compileError.CompileErrorType;"},
{"lineNum":"   25","line":"const CompileError = compileError.CompileError;"},
{"lineNum":"   26","line":"const reportTestCase = @import(\"report_test_case.zig\").reportTestCase;"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"pub const ErrorContext = struct {"},
{"lineNum":"   29","line":"    const ErrorList = std.ArrayList(CompileError);"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"    list: ErrorList,"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    pub fn new(alloc: Allocator) ErrorContext {","class":"lineCov","hits":"1","order":"1880","possible_hits":"1",},
{"lineNum":"   34","line":"        return ErrorContext{","class":"lineCov","hits":"1","order":"1882","possible_hits":"1",},
{"lineNum":"   35","line":"            .list = ErrorList.init(alloc),","class":"lineCov","hits":"1","order":"1881","possible_hits":"1",},
{"lineNum":"   36","line":"        };"},
{"lineNum":"   37","line":"    }"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn deinit(self: *ErrorContext) void {","class":"lineCov","hits":"2","order":"1977","possible_hits":"2",},
{"lineNum":"   40","line":"        self.list.deinit();","class":"lineCov","hits":"1","order":"1978","possible_hits":"1",},
{"lineNum":"   41","line":"    }"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    pub fn append(self: *ErrorContext, err: CompileError) !void {","class":"lineCov","hits":"2","order":"2212","possible_hits":"2",},
{"lineNum":"   44","line":"        try self.list.append(err);","class":"lineCov","hits":"1","order":"2213","possible_hits":"1",},
{"lineNum":"   45","line":"    }"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    pub fn count(self: ErrorContext) usize {","class":"lineCov","hits":"1","order":"2209","possible_hits":"1",},
{"lineNum":"   48","line":"        return self.list.items.len;","class":"lineCov","hits":"1","order":"2210","possible_hits":"1",},
{"lineNum":"   49","line":"    }"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    pub fn get(self: ErrorContext, index: usize) CompileError {","class":"lineCov","hits":"1","order":"2216","possible_hits":"1",},
{"lineNum":"   52","line":"        return self.list.items[index];","class":"lineCov","hits":"1","order":"2217","possible_hits":"1",},
{"lineNum":"   53","line":"    }"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    pub fn report(self: ErrorContext, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2226","possible_hits":"4",},
{"lineNum":"   56","line":"        for (self.list.items) |err|","class":"linePartCov","hits":"2","order":"2227","possible_hits":"4",},
{"lineNum":"   57","line":"            try err.report(writer);","class":"linePartCov","hits":"1","order":"2228","possible_hits":"2",},
{"lineNum":"   58","line":"    }"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    pub fn reportToStdErr(self: ErrorContext) !void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   61","line":"        const writer = std.io.getStdErr().writer();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"        try self.report(writer);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"    }"},
{"lineNum":"   64","line":"};"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"test \"can append errors to an ErrorContext and report them\" {","class":"lineCov","hits":"3","order":"2195","possible_hits":"3",},
{"lineNum":"   67","line":"    var ctx = ErrorContext.new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2196","possible_hits":"1",},
{"lineNum":"   68","line":"    defer ctx.deinit();","class":"linePartCov","hits":"1","order":"2245","possible_hits":"9",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    const err1 = CompileError.parseError(","class":"lineCov","hits":"1","order":"2202","possible_hits":"1",},
{"lineNum":"   71","line":"        ParseError.message(Cursor.new(3, 5), \"Some error message\"),","class":"lineCov","hits":"1","order":"2197","possible_hits":"1",},
{"lineNum":"   72","line":"    );"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    const err2 = CompileError.parseError(","class":"lineCov","hits":"1","order":"2207","possible_hits":"1",},
{"lineNum":"   75","line":"        ParseError.message(Cursor.new(4, 6), \"Some other error message\"),","class":"lineCov","hits":"1","order":"2206","possible_hits":"1",},
{"lineNum":"   76","line":"    );"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    try expectEqual(@intCast(usize, 0), ctx.count());","class":"linePartCov","hits":"1","order":"2208","possible_hits":"2",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    try ctx.append(err1);","class":"linePartCov","hits":"1","order":"2211","possible_hits":"2",},
{"lineNum":"   81","line":"    try expectEqual(@intCast(usize, 1), ctx.count());","class":"linePartCov","hits":"1","order":"2214","possible_hits":"2",},
{"lineNum":"   82","line":"    try expectEqual(err1, ctx.get(0));","class":"linePartCov","hits":"1","order":"2215","possible_hits":"2",},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"    try ctx.append(err2);","class":"linePartCov","hits":"1","order":"2218","possible_hits":"2",},
{"lineNum":"   85","line":"    try expectEqual(@intCast(usize, 2), ctx.count());","class":"linePartCov","hits":"1","order":"2219","possible_hits":"2",},
{"lineNum":"   86","line":"    try expectEqual(err2, ctx.get(1));","class":"linePartCov","hits":"1","order":"2220","possible_hits":"2",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    try reportTestCase(","class":"linePartCov","hits":"1","order":"2222","possible_hits":"2",},
{"lineNum":"   89","line":"        ctx,","class":"lineCov","hits":"1","order":"2221","possible_hits":"1",},
{"lineNum":"   90","line":"        \\\\Parse Error: 3:5: Some error message"},
{"lineNum":"   91","line":"        \\\\Parse Error: 4:6: Some other error message"},
{"lineNum":"   92","line":"        \\\\"},
{"lineNum":"   93","line":"        ,"},
{"lineNum":"   94","line":"    );"},
{"lineNum":"   95","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:34:54", "instrumented" : 33, "covered" : 30,};
var merged_data = [];
