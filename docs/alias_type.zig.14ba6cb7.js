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
{"lineNum":"   20","line":"const WriteContext = @import(\"../writer.zig\").WriteContext;"},
{"lineNum":"   21","line":"const Type = @import(\"type.zig\").Type;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const AliasType = struct {"},
{"lineNum":"   24","line":"    name: []const u8,"},
{"lineNum":"   25","line":"    ty: Type.Ptr,"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"    pub fn new(name: []const u8, ty: Type.Ptr) AliasType {","class":"lineCov","hits":"1","order":"1919","possible_hits":"1",},
{"lineNum":"   28","line":"        return AliasType{","class":"lineCov","hits":"1","order":"1922","possible_hits":"1",},
{"lineNum":"   29","line":"            .name = name,","class":"lineCov","hits":"1","order":"1920","possible_hits":"1",},
{"lineNum":"   30","line":"            .ty = ty,","class":"lineCov","hits":"1","order":"1921","possible_hits":"1",},
{"lineNum":"   31","line":"        };"},
{"lineNum":"   32","line":"    }"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn hash(self: AliasType) usize {","class":"lineCov","hits":"1","order":"1928","possible_hits":"1",},
{"lineNum":"   35","line":"        return std.hash.Wyhash.hash(0, self.name) ^ @ptrToInt(self.ty);","class":"lineCov","hits":"1","order":"1929","possible_hits":"1",},
{"lineNum":"   36","line":"    }"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    pub fn write(self: AliasType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1863","possible_hits":"4",},
{"lineNum":"   39","line":"        try writer.print(\"{s} (an alias for \", .{self.name});","class":"linePartCov","hits":"1","order":"1864","possible_hits":"2",},
{"lineNum":"   40","line":"        try self.ty.write(writer);","class":"linePartCov","hits":"1","order":"1865","possible_hits":"2",},
{"lineNum":"   41","line":"        try writer.print(\")\", .{});","class":"linePartCov","hits":"1","order":"1866","possible_hits":"2",},
{"lineNum":"   42","line":"    }"},
{"lineNum":"   43","line":"};"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"test \"can hash AliasType\" {","class":"lineCov","hits":"2","order":"1915","possible_hits":"2",},
{"lineNum":"   46","line":"    const number = Type.newNumber();","class":"lineCov","hits":"1","order":"1916","possible_hits":"1",},
{"lineNum":"   47","line":"    const string = Type.newString();","class":"lineCov","hits":"1","order":"1917","possible_hits":"1",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    const a = AliasType.new(\"a\", &number);","class":"lineCov","hits":"1","order":"1918","possible_hits":"1",},
{"lineNum":"   50","line":"    const b = AliasType.new(\"a\", &number);","class":"lineCov","hits":"1","order":"1923","possible_hits":"1",},
{"lineNum":"   51","line":"    const c = AliasType.new(\"a\", &string);","class":"lineCov","hits":"1","order":"1924","possible_hits":"1",},
{"lineNum":"   52","line":"    const d = AliasType.new(\"b\", &number);","class":"lineCov","hits":"1","order":"1925","possible_hits":"1",},
{"lineNum":"   53","line":"    const e = AliasType.new(\"c\", &string);","class":"lineCov","hits":"1","order":"1926","possible_hits":"1",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    try expect(a.hash() == b.hash());","class":"lineCov","hits":"1","order":"1927","possible_hits":"1",},
{"lineNum":"   56","line":"    try expect(a.hash() != c.hash());","class":"lineCov","hits":"1","order":"1930","possible_hits":"1",},
{"lineNum":"   57","line":"    try expect(a.hash() != d.hash());","class":"lineCov","hits":"1","order":"1931","possible_hits":"1",},
{"lineNum":"   58","line":"    try expect(a.hash() != e.hash());","class":"lineCov","hits":"1","order":"1932","possible_hits":"1",},
{"lineNum":"   59","line":"}"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"test \"can write AliasType\" {","class":"lineCov","hits":"3","order":"1933","possible_hits":"3",},
{"lineNum":"   62","line":"    const ctx = try WriteContext(.{}).new(std.testing.allocator);","class":"lineCov","hits":"1","order":"1934","possible_hits":"1",},
{"lineNum":"   63","line":"    defer ctx.deinit();","class":"linePartCov","hits":"1","order":"1941","possible_hits":"4",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    const number = Type.newNumber();","class":"lineCov","hits":"1","order":"1935","possible_hits":"1",},
{"lineNum":"   66","line":"    const ty = AliasType.new(\"SomeTypeName\", &number);","class":"lineCov","hits":"1","order":"1936","possible_hits":"1",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    try ty.write(ctx.writer());","class":"linePartCov","hits":"1","order":"1937","possible_hits":"2",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    const str = try ctx.toString();","class":"linePartCov","hits":"1","order":"1938","possible_hits":"2",},
{"lineNum":"   71","line":"    defer ctx.freeString(str);","class":"linePartCov","hits":"1","order":"1940","possible_hits":"2",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    try std.testing.expectEqualStrings(","class":"linePartCov","hits":"1","order":"1939","possible_hits":"2",},
{"lineNum":"   74","line":"        \"SomeTypeName (an alias for number)\","},
{"lineNum":"   75","line":"        str,"},
{"lineNum":"   76","line":"    );"},
{"lineNum":"   77","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-08 20:31:10", "instrumented" : 31, "covered" : 31,};
var merged_data = [];
