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
{"lineNum":"   20","line":"const Type = @import(\"type.zig\").Type;"},
{"lineNum":"   21","line":"const allocate = @import(\"../../common/allocate.zig\");"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"const MapContext = struct {"},
{"lineNum":"   24","line":"    pub fn hash(self: @This(), arr: ArrayType) u64 {","class":"lineCov","hits":"1","order":"1305","possible_hits":"1",},
{"lineNum":"   25","line":"        _ = self;"},
{"lineNum":"   26","line":"        return @ptrToInt(arr.subtype);","class":"lineCov","hits":"1","order":"1306","possible_hits":"1",},
{"lineNum":"   27","line":"    }"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    pub fn eql(self: @This(), a: ArrayType, b: ArrayType) bool {","class":"lineCov","hits":"1","order":"1311","possible_hits":"1",},
{"lineNum":"   30","line":"        _ = self;"},
{"lineNum":"   31","line":"        return a.subtype == b.subtype;","class":"lineCov","hits":"1","order":"1312","possible_hits":"1",},
{"lineNum":"   32","line":"    }"},
{"lineNum":"   33","line":"};"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"const ArrayTypeMap = struct {"},
{"lineNum":"   36","line":"    const Map = std.HashMap("},
{"lineNum":"   37","line":"        ArrayType,"},
{"lineNum":"   38","line":"        Type.Ptr,"},
{"lineNum":"   39","line":"        MapContext,"},
{"lineNum":"   40","line":"        std.hash_map.default_max_load_percentage,"},
{"lineNum":"   41","line":"    );"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    map: Map,"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    pub fn new(alloc: Allocator) ArrayTypeMap {","class":"lineCov","hits":"1","order":"168","possible_hits":"1",},
{"lineNum":"   46","line":"        return ArrayTypeMap{","class":"lineCov","hits":"1","order":"170","possible_hits":"1",},
{"lineNum":"   47","line":"            .map = Map.init(alloc),","class":"lineCov","hits":"1","order":"169","possible_hits":"1",},
{"lineNum":"   48","line":"        };"},
{"lineNum":"   49","line":"    }"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    pub fn deinit(self: *ArrayTypeMap) void {","class":"lineCov","hits":"2","order":"318","possible_hits":"2",},
{"lineNum":"   52","line":"        var it = self.map.valueIterator();","class":"lineCov","hits":"1","order":"319","possible_hits":"1",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"        while (it.next()) |val|","class":"lineCov","hits":"2","order":"320","possible_hits":"2",},
{"lineNum":"   55","line":"            self.map.allocator.destroy(val.*);","class":"lineCov","hits":"1","order":"1321","possible_hits":"1",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"        self.map.deinit();","class":"lineCov","hits":"1","order":"321","possible_hits":"1",},
{"lineNum":"   58","line":"    }"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    pub fn get(self: *ArrayTypeMap, subtype: Type.Ptr) Type.Ptr {","class":"lineCov","hits":"1","order":"1299","possible_hits":"1",},
{"lineNum":"   61","line":"        const arrTy = ArrayType{ .subtype = subtype };","class":"lineCov","hits":"1","order":"1300","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"        if (self.map.get(arrTy)) |ty|","class":"lineCov","hits":"2","order":"1301","possible_hits":"2",},
{"lineNum":"   64","line":"            return ty;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"        var ty = allocate.create(self.map.allocator, Type);","class":"lineCov","hits":"1","order":"1302","possible_hits":"1",},
{"lineNum":"   67","line":"        ty.* = Type{ .Array = arrTy };","class":"lineCov","hits":"1","order":"1303","possible_hits":"1",},
{"lineNum":"   68","line":"        self.map.put(arrTy, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"1304","possible_hits":"1",},
{"lineNum":"   69","line":"        return ty;","class":"lineCov","hits":"1","order":"1307","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":"};"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"pub const ArrayType = struct {"},
{"lineNum":"   74","line":"    pub const Map = ArrayTypeMap;"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    subtype: Type.Ptr,"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    pub fn write(self: ArrayType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1035","possible_hits":"4",},
{"lineNum":"   79","line":"        if (self.subtype.getType() == .Union) {","class":"linePartCov","hits":"2","order":"1036","possible_hits":"4",},
{"lineNum":"   80","line":"            try writer.print(\"(\", .{});","class":"linePartCov","hits":"1","order":"1047","possible_hits":"2",},
{"lineNum":"   81","line":"            try self.subtype.write(writer);","class":"linePartCov","hits":"1","order":"1048","possible_hits":"2",},
{"lineNum":"   82","line":"            try writer.print(\")[]\", .{});","class":"linePartCov","hits":"1","order":"1056","possible_hits":"2",},
{"lineNum":"   83","line":"        } else {"},
{"lineNum":"   84","line":"            try self.subtype.write(writer);","class":"linePartCov","hits":"1","order":"1037","possible_hits":"2",},
{"lineNum":"   85","line":"            try writer.print(\"[]\", .{});","class":"linePartCov","hits":"1","order":"1038","possible_hits":"2",},
{"lineNum":"   86","line":"        }"},
{"lineNum":"   87","line":"    }"},
{"lineNum":"   88","line":"};"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-30 12:37:28", "instrumented" : 27, "covered" : 26,};
var merged_data = [];
